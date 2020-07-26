document.addEventListener("DOMContentLoaded", () => {
    createBarcodeForm()
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

function barcodeSubmission(){
    event.preventDefault()
    let barcode = document.getElementById("barcode").value
    return barcode
}

function fetchProduct(){
    let barcode = parseInt(barcodeSubmission())
    
    fetch(`${BASE_URL}/foods/${barcode}`)
    .then(resp => {
        if(!resp.ok) throw "Product Not Found"
        return resp.json()
    })
    .then(food => {
        let foodProduct = new Food(food.brand_owner, food.gtin_upc, food.ingredients)
        foodProduct.renderProduct()

    }).catch(error => {
        document.getElementById("error").innerHTML = error
    })
}