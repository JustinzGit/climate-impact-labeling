import Chartkick from "chartkick"
import Chart from "chart.js"
Chartkick.use(Chart)

document.addEventListener("DOMContentLoaded", () => {
    createBarcodeForm()
    createSearchForm()
    fetchEmissions()
})

const BASE_URL = "http://127.0.0.1:3000"

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
        let barcode = document.getElementById("barcode").value
        fetchProduct(barcode)
    })
}

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

    searchForm.addEventListener("submit", searchProduct)
}

function searchProduct(){
    event.preventDefault()
    let name = document.getElementById("name").value

    fetch(`${BASE_URL}/foods/search/${name}`)
    .then(resp => {return resp.json()})
    .then(foods => {
        removeSearchResults()

        if (foods.length === 0){
            document.getElementById("alert").innerHTML = "No Products Found"
        }
        else {
            let resultsDiv = document.getElementById("search-results")
            resultsDiv.innerHTML += `<b><u>Search Results</b></u>`

            for (const food of foods){
                let p = document.createElement("p")
                
                let a = document.createElement("a")
                a.setAttribute("href", "")
                a.setAttribute("id", food.gtin_upc)
                a.innerHTML = `${food.name}`

                p.append(a)
                resultsDiv.appendChild(p)

                a.addEventListener("click", () => {
                    fetchProduct(event.target.id)
                    removeSearchResults()
                })
                
            }
        }
    })
}

function fetchProduct(barcode){
    event.preventDefault()

    fetch(`${BASE_URL}/foods/barcode/${barcode}`)
    .then(resp => {
        if(!resp.ok) throw "Product Not Found"
        return resp.json()
    })
    .then(food => {
        if(food === null) throw "Product Not Found"

        let foodProduct = new Food(food.name, food.brand_owner, food.gtin_upc, food.ingredients, food.food_nutrients)

        // Remove previous product data
        document.getElementById("product-data").innerHTML = ""

        foodProduct.renderProduct()
        foodProduct.renderNutrition()
        fetchEmissions()

        // Remove previous product emission data 
        document.getElementById("emission").innerHTML = ""
        document.getElementById("product-emissions-chart").innerHTML = ""
        document.getElementById("product-emissions-chart",).style.display = "none"

        if (food.emissions.length === 0){
            let emissionDiv = document.getElementById("emission")
            emissionDiv.style.marginBottom = "100px"

            emissionDiv.innerHTML +=
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
                    let food_category = document.getElementById("data-select").value
                    Food.assignCategory(food, food_category)
                })
                form.append(p, submitBtn)

                emissionDiv.append(form)
            })
        }
        else {
            for (const emission of food.emissions){
                let foodEmissionData = new Emission(emission.food_category, emission.land_use, 
                    emission.ghg_emissions, emission.acidifying_emissions, emission.eutrophying_emissions,
                    emission.freshwater_withdrawl)
                foodEmissionData.renderEmission()
            }
        }

    }).catch(error => {
        document.getElementById("alert").innerHTML = error
    })
}

function fetchEmissions() {
    fetch(`${BASE_URL}/emissions`)
    .then(resp => resp.json())
    .then(emissions => {

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