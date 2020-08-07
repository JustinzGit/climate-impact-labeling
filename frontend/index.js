import Chartkick from "chartkick"
import Chart from "chart.js"
Chartkick.use(Chart)

document.addEventListener("DOMContentLoaded", () => {
    createBarcodeForm()
    createSearchForm()
    fetchEmissionCategories()
})

const BASE_URL = "http://127.0.0.1:3000"

// Fetches food, renders to DOM
function fetchFoodById(id){
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
    
        let foodObj = new Food(food.id, food.name, food.brand_owner, food.gtin_upc, 
            food.ingredients, food.serving_size, food.serving_size_unit, food.calcium, food.calories, 
            food.carbohydrates, food.cholesterol, food.fiber, food.iron, 
            food.protein, food.saturated_fat, food.sodium, food.sugars, 
            food.total_fat, food.trans_fat, food.vitamin_a, food.vitamin_c, food.emission_category_id)

        foodObj.renderFood()
        fetchEmissionCategory(foodObj)
        
        let nutritionDiv = document.getElementById("nutrition")
        let a = document.createElement("a")
        a.setAttribute("href", "")
        a.innerHTML = "Edit Nutrition Facts"
        nutritionDiv.append(a)

        a.addEventListener("click", () => {
            event.preventDefault()

            let form = document.createElement("form")
            form.addEventListener("submit", () => {
                assignNutritionFacts(foodObj.id)
            })
            form.innerHTML = 
            `
            <label>Serving Size</label>
            <p><input type="text" id="serving_size" value="${foodObj.serving_size}"></p>

            <label>Calcium (mg)</label>
            <p><input type="text" id="calcium" value="${foodObj.calcium}"></p>

            <label>Calories (kCAL)</label>
            <p><input type="text" id="calories" value="${foodObj.calories} "></p>

            <label>Carbohydrate (g)</label>
            <p><input type="text" id="carbohydrates" value="${foodObj.carbohydrates}"></p>

            <label>Cholesterol (mg)</label>
            <p><input type="text" id="cholesterol" value="${foodObj.cholesterol}"></p>

            <label>Fiber (g)</label>
            <p><input type="text" id="fiber" value="${foodObj.fiber}"></p>

            <label>Iron (mg)</label>
            <p><input type="text" id="iron" value="${foodObj.iron}"></p>

            <label>Protein (g)</label>
            <p><input type="text" id="protein" value="${foodObj.protein}"></p>

            <label>Saturated Fat (g)</label>
            <p><input type="text" id="saturated_fat" value="${foodObj.saturated_fat}"></p>

            <label>Sodium (mg)</label>
            <p><input type="text" id="sodium" value="${foodObj.sodium}"></p>

            <label>Sugars (g)</label>
            <p><input type="text" id="sugars" value="${foodObj.sugars}"></p>

            <label>Total Fat (g)</label>
            <p><input type="text" id="total_fat" value="${foodObj.total_fat}"></p>

            <label>Trans Fat (g)</label>
            <p><input type="text" id="trans_fat" value="${foodObj.trans_fat}"></p>

            <label>Vitamin A (IU)</label>
            <p><input type="text" id="vitamin_a" value="${foodObj.vitamin_a}"></p>

            <label>Vitamin C (mg)</label>
            <p><input type="text" id="vitamin_c" value="${foodObj.vitamin_c}"></p>
            <input type="submit" class="btn btn-secondary" value="Edit Nutrition Facts">
            `
            nutritionDiv.innerHTML = ""
            nutritionDiv.append(form)
        })

    }).catch(error => {
        document.getElementById("alert").innerHTML = error
    })
}

// Fetches emission category of food, renders to DOM in chart
function fetchEmissionCategory(foodObj){
    if (foodObj.emission_category){
        fetch(`${BASE_URL}/emission_categories/${foodObj.emission_category}`)
        .then(resp => resp.json())
        .then(emissionCategory => {
            let category = new EmissionCategory(emissionCategory.food_category, emissionCategory.land_use, 
                emissionCategory.ghg_emissions, emissionCategory.acidifying_emissions, emissionCategory.eutrophying_emissions,
                emissionCategory.freshwater_withdrawl)
            category.renderEmissionCategory()
        })
    }
    else {
        document.getElementById("product-emissions-chart",).style.display = "none"
        let emissionDiv = document.getElementById("emission-category")

        emissionDiv.innerHTML =
        `
        <h3>This Product Hasn't Been Assigned A Category</h3>
            <p>Select a food category that is the most representative</p>
        `
        
        fetch(`${BASE_URL}/emission_categories`)
        .then(resp => resp.json())
        .then(emission_categories => {
            let p = document.createElement("p")
            let select = document.createElement("select")
            p.append(select)
    
            select.setAttribute("class", "custom-select")
            select.setAttribute("id", "data-select")
    
            let emissionCategories = []
            for (const category of emission_categories){
                emissionCategories.push([category.food_category, category.id])
            }
            
            emissionCategories.sort(function(a, b) {
                if (b[0] > a[0]) return -1
                if (b[0] < a[0]) return 1
                return 0
            })
            
            for (const category of emissionCategories){
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
                let emissionCategoryId = document.getElementById("data-select").value
                assignEmissionCategory(foodObj.id, emissionCategoryId)
            })
            form.append(p, submitBtn)
            form.style.marginBottom = "50px"
            emissionDiv.append(form)
        })
    }
}

// Renders a list of food items to be selected from
function searchFoodByName(name){
    fetch(`${BASE_URL}/foods/search/${name}`)
    .then(resp => {return resp.json()})
    .then(foods => {
        if (foods.length === 0){
            document.getElementById("alert").innerHTML = "No Products Found"
        }
        else {
            let resultsDiv = document.getElementById("search-results")
            resultsDiv.innerHTML = `<b><u>Search Results</b></u>`
        
            for (const food of foods){
                let p = document.createElement("p")
                let a = document.createElement("a")
        
                a.setAttribute("href", "")
                a.setAttribute("id", food.gtin_upc)
                a.innerHTML = `${food.name}`
        
                p.append(a)
                resultsDiv.appendChild(p)
        
                a.addEventListener("click", () => {
                    event.preventDefault()
                    fetchFoodById(event.target.id)
                    resultsDiv.innerHTML = ""
                })  
            }
        }
    })
}

// Assigns emission cateogry to food 
function assignEmissionCategory(foodId, emissionCategoryId){
    fetch(`${BASE_URL}/foods/${foodId}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            emission_category_id: emissionCategoryId
        })
    })
    .then(resp => resp.json())
    .then(food => {
        fetchFoodById(food.id)
    })
}

function assignNutritionFacts(foodId){
    event.preventDefault()
    let elements = document.forms[2].elements
    let nutritionParams = {}
    for(const element of elements){
        if (element.id){
            nutritionParams[element.id] = element.value
        }
    }

    fetch(`${BASE_URL}/foods/${foodId}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(nutritionParams)
    })
    .then(resp => resp.json())
    .then(food => {
        fetchFoodById(food.id)
    })
}

// Fetches list of all emission categories, renders into one chart
function fetchEmissionCategories() {
    fetch(`${BASE_URL}/emission_categories`)
    .then(resp => resp.json())
    .then(emission_categories => {

        document.getElementById("selection").innerHTML += 
        `
        <h2>Environmental Impact of Food Products</h2>
        <select class="custom-select" id="data-select">
            <option value="ghg_emissions">Green House Gas Emissions</option>
            <option value="acidifying_emissions">Acidifying Emissions</option>
            <option value="freshwater_withdrawl">Water Withdrawl</option>
            <option value="eutrophying_emissions">Eutrophication</option>
            <option value="land_use">Land Usage</option>
        </select>
        `
        document.getElementById("data-select").addEventListener("change", () => {
            renderCategorySelection(event.target.value)
        })

        function renderCategorySelection(userSelection = "ghg_emissions"){
            let data = []
            for (const entry of emission_categories){
                if (entry[userSelection] > 0){
                    data.push([entry.food_category, entry[userSelection]])
                }
            }
            data.sort((a, b) => b[1] - a[1])
           
            addChartLabels(userSelection)
            new Chartkick.BarChart("emissions-chart", data, {legend: false})
        }

        renderCategorySelection();

        // Add appropriate chart labels based on users selection
        function addChartLabels(userSelection){
            let xAxis  = document.getElementById("x-axis")
            let chartTitle = document.getElementById("chart-title")
        
            switch(userSelection){
                case "ghg_emissions":
                    chartTitle.innerHTML = `Green House Gas Emissions`
                    xAxis.innerHTML = `kg CO<sub>2</sub>eq per kg/L Food Product`
                    break

                case "acidifying_emissions":
                    chartTitle.innerHTML = `Acidifying Emissions`
                    xAxis.innerHTML = `g SO<sub>2</sub>eq per kg/L Food Product`
                    break

                case "freshwater_withdrawl":
                    chartTitle.innerHTML = `Freshwater Withdrawl`
                    xAxis.innerHTML = `Liter per kg/L Food Product`
                    break
                
                case "eutrophying_emissions":
                    chartTitle.innerHTML = `Eutrophication`
                    xAxis.innerHTML = `g PO<sub>4</sub><sup>3-</sup>eq per kg/L Food Product`
                    break
                
                case "land_use":
                    chartTitle.innerHTML = `Land Usage`
                    xAxis.innerHTML = `m<sup>2</sup> per kg/L Food Product`
                    break
            }
        }
    })
}

// Creates form where a known GTIN or UPC can be entered
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
        fetchFoodById(document.getElementById("barcode").value)
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
        searchFoodByName(document.getElementById("name").value)
    })
}