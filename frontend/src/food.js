class Food {
    constructor(owner, barcode, ingredients)
    {
        this.owner = owner
        this.barcode = barcode
        this.ingredients = ingredients
    }

    renderProduct() {
        let productDiv = document.getElementById("product")

        productDiv.innerHTML += 
        `
        <h2>Product Information</h2>
            <ul>
                <li>Barcode: ${this.barcode}</li>
                <li>Brand Owner: ${this.owner}</li>
            </ul>

            <p>Ingredients:</p>
            <p>${this.ingredients}</p>
        `
    }
}