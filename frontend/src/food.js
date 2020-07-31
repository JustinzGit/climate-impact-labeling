class Food {
    constructor(name, owner, barcode, ingredients, nutrients)
    {
        this.name = name
        this.owner = owner
        this.barcode = barcode
        this.ingredients = ingredients
        this.nutrients = nutrients
    }

    renderProduct() {
        let productDiv = document.getElementById("product-data")

        productDiv.innerHTML += 
        `
        <h2><u>Product Details</u></h2>
            <br>
            <h4 style="color: blue">${this.name}</h4>
            <p><b>Brand Owner:</b> ${this.owner}</p>
    
            <p><b>Ingredients:</b> ${this.ingredients}</p>
        `
    }

    renderNutrients() {
        // Remove previous data
        document.getElementById("nutrients").innerHTML = ""

        let nutrients = {}
        for (const nutrient of this.nutrients){
            nutrients[nutrient["nutrient_id"]] = nutrient.amount 
        }

        document.getElementById("nutrients").innerHTML += 
        `
        <h3>Nutrients</h3>
            <p><b>Total Fat:</b> ${nutrients["1004"]}g</p>
            <p>Saturated Fat: ${nutrients["1258"]}g</p>
            <p>Polyunsaturated Fat: ${nutrients["1293"]}g</p>
            <p>Monounsaturated Fat: ${nutrients["1292"]}g</p>
            <p><b>Cholesterol:</b> ${nutrients["1253"]}mg</p>
            <p><b>Total Carbohydrate:</b> ${nutrients["1050"]}g</p>
            <p>Dietary Fiber: ${nutrients["1079"]}g</p>
            <p>Total Sugars: ${nutrients["2000"]}g</p>
        `
    }
}