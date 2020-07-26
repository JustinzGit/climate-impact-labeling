document.addEventListener("DOMContentLoaded", () => {
    createBarcodeForm()
})

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

    barcodeForm.addEventListener("submit", barcodeSubmission)
}

function barcodeSubmission(){
    event.preventDefault()
    let barcode = document.getElementById("barcode").value
    return barcode
}