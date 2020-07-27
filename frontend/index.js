import Chartkick from "chartkick"
import Chart from "chart.js"
Chartkick.use(Chart)

document.addEventListener("DOMContentLoaded", () => {
    
    
    createBarcodeForm()
    renderChart()
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

        for (const emission of food.emissions){
            let foodEmission = new Emission(emission.food_category, emission.land_use, 
                emission.ghg_emissions, emission.acidifying_emission, emission.eutrophying_emissions,
                emission.freshwater_withdrawl)
            foodEmission.renderEmission()
        }

    }).catch(error => {
        document.getElementById("error").innerHTML = error
    })
}

function renderChart() {
    new Chartkick.PieChart("chart-1", [["Blueberry", 44], ["Strawberry", 23]])
}