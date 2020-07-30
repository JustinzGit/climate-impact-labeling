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
        <label for="barcode">Enter Product Barcode</label><br>
        <p><input type="text" id="barcode"></p>
        <input type="submit">
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
        <label for="search">Enter By Product By Name</label><br>
        <p><input type="text" id="name"></p>
        <input type="submit">
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
            document.getElementById("error").innerHTML = "No Products Found"
        }
        else {
            let resultsDiv = document.getElementById("search-results")

            for (const food of foods){
                let p = document.createElement("p")
                
                let div = document.createElement("div")
                div.setAttribute("id", food.gtin_upc)
                div.innerText = `${food.name}`

                p.append(div)
                resultsDiv.appendChild(p)

                div.addEventListener("click", () => {
                    removeSearchResults()
                    fetchProduct(event.target.id)
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

        let foodProduct = new Food(food.name, food.brand_owner, food.gtin_upc, food.ingredients)
        
        // Remove previous product data
        document.getElementById("product-data").innerHTML = ""

        foodProduct.renderProduct()
        fetchEmissions()

        // Remove previous product emission data 
        document.getElementById("emission").innerHTML = ""
        document.getElementById("product-emissions-chart").innerHTML = ""

        for (const emission of food.emissions){
            let foodEmissionData = new Emission(emission.food_category, emission.land_use, 
                emission.ghg_emissions, emission.acidifying_emissions, emission.eutrophying_emissions,
                emission.freshwater_withdrawl)
            foodEmissionData.renderEmission()
        }

    }).catch(error => {
        document.getElementById("error").innerHTML = error
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
            data.sort(function(a, b){
                return b[1] - a[1]
            })
            new Chartkick.BarChart("emissions-chart", data, {legend: false})
        }

        renderSelection();
    })
}

// Remove previous search results
function removeSearchResults(){
    document.getElementById("search-results").innerHTML = ""
}