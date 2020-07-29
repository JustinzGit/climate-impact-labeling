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

    barcodeForm.addEventListener("submit", fetchProduct)
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

    searchForm.addEventListener("submit")
}

function fetchProduct(){
    event.preventDefault()
    let barcode = document.getElementById("barcode").value
    
    fetch(`${BASE_URL}/foods/barcode/${barcode}`)
    .then(resp => {
        if(!resp.ok) throw "Product Not Found"
        return resp.json()
    })
    .then(food => {
        if(food === null) throw "Product Not Found"

        let foodProduct = new Food(food.brand_owner, food.gtin_upc, food.ingredients)
        foodProduct.renderProduct()
        fetchEmissions()

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