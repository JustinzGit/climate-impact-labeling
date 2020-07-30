class Food {
    constructor(name, owner, barcode, ingredients)
    {
        this.name = name
        this.owner = owner
        this.barcode = barcode
        this.ingredients = ingredients
    }

    renderProduct() {
        let productDiv = document.getElementById("product-data")

        productDiv.innerHTML += 
        `
        <h2>Product Information</h2>
            <ul>
                <li>Name: ${this.name}</li>
                <li>Brand Owner: ${this.owner}</li>
            </ul>

            <p>Ingredients:</p>
            <p>${this.ingredients}</p>
        `
    }
}