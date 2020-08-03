import Chartkick from "chartkick"
import Chart from "chart.js"
Chartkick.use(Chart)

document.addEventListener("DOMContentLoaded", () => {
    createBarcodeForm()
    createSearchForm()
    fetchEmissions()
})

const BASE_URL = "http://127.0.0.1:3000"

function fetchProductsByName(name){
    fetch(`${BASE_URL}/foods/search/${name}`)
    .then(resp => {return resp.json()})
    .then(foods => {
        if (foods.length === 0){
            document.getElementById("alert").innerHTML = "No Products Found"
        }
        else {
            renderProducts(foods)
        }
    })
}

function renderProducts(foodCollection){
    let resultsDiv = document.getElementById("search-results")
    resultsDiv.innerHTML += `<b><u>Search Results</b></u>`

    for (const food of foodCollection){
        let p = document.createElement("p")
        let a = document.createElement("a")

        a.setAttribute("href", "")
        a.setAttribute("id", food.gtin_upc)
        a.innerHTML = `${food.name}`

        p.append(a)
        resultsDiv.appendChild(p)

        a.addEventListener("click", () => {
            event.preventDefault()
            fetchProductById(event.target.id)
            removeSearchResults()
        })  
    }
}

function fetchProductById(id){
    let fetchParam
    if (id.toString().length > 6) {
        fetchParam = `${BASE_URL}/foods/barcode/${id}`
    }
    else {
        fetchParam = `${BASE_URL}/foods/${id}`
    }
   
    fetch(fetchParam)
    .then(resp => {
        if(!resp.ok) throw "Product Not Found"
        return resp.json()
    })
    .then(food => {
        if(food === null) throw "Product Not Found"
        else {renderProduct(food)}

    }).catch(error => {
        document.getElementById("alert").innerHTML = error
    })
}

function renderProduct(food){
    let foodObj = new Food(food.name, food.brand_owner, food.gtin_upc, 
        food.ingredients, food.food_nutrients)

    foodObj.renderProduct()

    document.getElementById("product-emissions-chart").innerHTML = ""
    document.getElementById("product-emissions-chart",).style.display = "none"

    if (food.emissions.length === 0){
        renderCategorySelect(food)
    }
    else {
        renderEmissionData(food)
    }
}


function renderEmissionData(food){
    for (const emission of food.emissions){
        let emissionObj = new Emission(emission.food_category, emission.land_use, 
            emission.ghg_emissions, emission.acidifying_emissions, emission.eutrophying_emissions,
            emission.freshwater_withdrawl)
        emissionObj.renderEmission()
    }
}

function renderCategorySelect(food){
    let emissionDiv = document.getElementById("emission")

    emissionDiv.innerHTML =
    `
    <h3>This Product Hasn't Been Assigned A Category</h3>
        <p>Select a food category that is the most representative</p>
    `
    
    fetch(`${BASE_URL}/emissions`)
    .then(resp => resp.json())
    .then(emissions => {
        let p = document.createElement("p")
        let select = document.createElement("select")
        p.append(select)

        select.setAttribute("class", "custom-select")
        select.setAttribute("id", "data-select")

        let foodCategories = []

        for (const food of emissions){
            foodCategories.push([food.food_category, food.id])
        }
        
        foodCategories.sort(function(a, b) {
            if (b[0] > a[0]) return -1
            if (b[0] < a[0]) return 1
            return 0
        })
        
        for (const category of foodCategories){
            let option = document.createElement("option")
            option.setAttribute("value", category[1])
            option.innerHTML = `${category[0]}`
            select.append(option)
        }
        
        let form = document.createElement("form")
        let submitBtn = document.createElement("button")

        submitBtn.setAttribute("value", "submit")
        submitBtn.setAttribute("class", "btn btn-secondary")
        submitBtn.innerHTML = "Submit"

        form.addEventListener("submit", () => {
            event.preventDefault()
            let emission_category = document.getElementById("data-select").value
            assignEmissionCategory(food.id, emission_category)
        })
        form.append(p, submitBtn)

        emissionDiv.append(form)
    })
}

// Creates association between food product and emission food category 
function assignEmissionCategory(food, emissionCategory){
    let data = {
        food_id: food,
        emission_id: emissionCategory
    }

    fetch(`${BASE_URL}/food_emissions`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(food => {
        fetchProductById(food.food_id)
    })
}



function fetchEmissions() {
    fetch(`${BASE_URL}/emissions`)
    .then(resp => resp.json())
    .then(emissions => {

        document.getElementById("selection").innerHTML += 
        `
        <h3>Environmental Impact of Food Products</h3>
        <select class="custom-select" id="data-select">
            <option value="ghg_emissions">Green House Gas Emissions</option>
            <option value="acidifying_emissions">Acidifying Emissions</option>
            <option value="freshwater_withdrawl">Water Withdrawl</option>
            <option value="eutrophying_emissions">Eutrophication</option>
            <option value="land_use">Land Usage</option>
        </select>
        `
        document.getElementById("data-select").addEventListener("change", () => {
            renderSelection(event.target.value)
        })

        function renderSelection(userSelection = "ghg_emissions"){
            let data = []
            for (const entry of emissions){
                if (entry[userSelection] > 0){
                    data.push([entry.food_category, entry[userSelection]])
                }
            }
            data.sort((a, b) => b[1] - a[1])
           
            addChartLabels(userSelection)
            new Chartkick.BarChart("emissions-chart", data, {legend: false})
        }

        renderSelection();
    })
}

function addChartLabels(userSelection){
    let xAxis  = document.getElementById("x-axis")
    let chartTitle = document.getElementById("chart-title")
    chartTitle.innerHTML = ""
    xAxis.innerHTML = ""

    switch(userSelection){
        case "ghg_emissions":
            chartTitle.innerHTML += `Green House Gas Emissions`
            xAxis.innerHTML += `kg CO<sub>2</sub>eq per kg/L Food Product`
            break

        case "acidifying_emissions":
            chartTitle.innerHTML += `Acidifying Emissions`
            xAxis.innerHTML += `g SO<sub>2</sub>eq per kg/L Food Product`
            break

        case "freshwater_withdrawl":
            chartTitle.innerHTML += `Freshwater Withdrawl`
            xAxis.innerHTML += `Liter per kg/L Food Product`
            break
        
        case "eutrophying_emissions":
            chartTitle.innerHTML += `Eutrophication`
            xAxis.innerHTML += `g PO<sub>4</sub><sup>3-</sup>eq per kg/L Food Product`
            break
        
        case "land_use":
            chartTitle.innerHTML += `Land Usage`
            xAxis.innerHTML += `m<sup>2</sup> per kg/L Food Product`
            break
    }
}

// Remove previous search results
function removeSearchResults(){
    document.getElementById("search-results").innerHTML = ""
}

// Creats form whereby a known GTIN or UPC can be entered
function createBarcodeForm(){
    let barcodeForm = document.getElementById("barcode-form")

    barcodeForm.innerHTML +=
    `
    <form>
        <label for="barcode">Search Product By Barcode</label><br>
        <p><input type="text" id="barcode"></p>
        <button type="submit" class="btn btn-secondary">Search</button>
    </form>
    `

    barcodeForm.addEventListener("submit", () => {
        event.preventDefault()
        fetchProductById(document.getElementById("barcode").value)
    })
}

// Creats search form to search product by name 
function createSearchForm() {
    let searchForm = document.getElementById("search-form")

    searchForm.innerHTML += 
    `
    <form>
        <label for="search">Search Product By Name</label><br>
        <p><input type="text" id="name"></p>
        <button type="submit" class="btn btn-secondary">Search</button>
    </form>
    `

    searchForm.addEventListener("submit", () => {
        event.preventDefault()
        fetchProductsByName(document.getElementById("name").value)
    })
}