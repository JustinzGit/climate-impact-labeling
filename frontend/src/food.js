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
        console.log(this)
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

        function obtainNutrient(nutrient){
            if (nutrient === undefined){
                return `<b style="color: red;">(N/A)</b>`
            }
            else {
                return nutrient
            }
        }

        function calculateFatCalories(fat_amount){
            if (fat_amount === undefined){
                return `<b style="color: red;">(N/A)</b>`
            }
            else {
                return fat_amount * 9
            }
        }

        document.getElementById("nutrients").innerHTML += 
        `
        <section class="performance-facts">
        <header class="performance-facts__header">
            <h1 class="performance-facts__title">Nutrition Facts</h1>
            <p>Serving Size: ${obtainNutrient(this.serving_size)} 
            <br>Unit: ${obtainNutrient(this.serving_size_unit)} (about ***g)
            <p>Serving Per Container ***</p>
        </header>
        <table class="performance-facts__table">
            <thead>
            <tr>
                <th colspan="3" class="small-info">Amount Per Serving</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th colspan="2"><b>Calories</b> ${obtainNutrient(nutrients["1008"])}</th>
                <td>Calories from Fat ${calculateFatCalories(nutrients["1004"])}</td>
            </tr>
            <tr class="thick-row">
                <td colspan="3" class="small-info"><b>% Daily Value*</b></td>
            </tr>
            <tr>
                <th colspan="2"><b>Total Fat</b> ${obtainNutrient(nutrients["1004"])}g</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Saturated Fat ${obtainNutrient(nutrients["1258"])}g</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Trans Fat ${obtainNutrient(nutrients["1257"])}g</th>
                <td></td>
            </tr>
            <tr>
                <th colspan="2"><b>Cholesterol</b> ${obtainNutrient(nutrients["1253"])}mg</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <th colspan="2"><b>Sodium</b> ${obtainNutrient(nutrients["1093"])}mg</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <th colspan="2"><b>Total Carbohydrate</b> ${obtainNutrient(nutrients["1050"])}g</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Dietary Fiber ${obtainNutrient(nutrients["2033"])}g</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Sugars ${obtainNutrient(nutrients["2000"])}g</th>
                <td></td>
            </tr>
            <tr class="thick-end">
                <th colspan="2"><b>Protein</b> ${obtainNutrient(nutrients["1003"])}g</th>
                <td></td>
            </tr>
            </tbody>
        </table>
    
        <table class="performance-facts__table--grid">
            <tbody>
            <tr>
                <td colspan="2">Vitamin A ${obtainNutrient(nutrients["1104"])} IU *%</td>
                <td>Vitamin C ${obtainNutrient(nutrients["1162"])}mg *%</td>
            </tr>
            <tr class="thin-end">
                <td colspan="2">Calcium ${obtainNutrient(nutrients["1087"])}mg *%</td>
                <td>Iron ${obtainNutrient(nutrients["1089"])}mg *%</td>
            </tr>
            </tbody>
        </table>
    
        <p class="small-info">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</p>
    
        <table class="performance-facts__table--small small-info">
            <thead>
            <tr>
                <td colspan="2"></td>
                <th>Calories:</th>
                <th>2,000</th>
                <th>2,500</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th colspan="2">Total Fat</th>
                <td>Less than</td>
                <td>65g</td>
                <td>80g</td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Saturated Fat</th>
                <td>Less than</td>
                <td>20g</td>
                <td>25g</td>
            </tr>
            <tr>
                <th colspan="2">Cholesterol</th>
                <td>Less than</td>
                <td>300mg</td>
                <td>300 mg</td>
            </tr>
            <tr>
                <th colspan="2">Sodium</th>
                <td>Less than</td>
                <td>2,400mg</td>
                <td>2,400mg</td>
            </tr>
            <tr>
                <th colspan="3">Total Carbohydrate</th>
                <td>300g</td>
                <td>375g</td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th colspan="2">Dietary Fiber</th>
                <td>25g</td>
                <td>30g</td>
            </tr>
            </tbody>
        </table>
    
        <p class="small-info">
            Calories per gram:
        </p>
        <p class="small-info text-center">
            Fat 9
            &bull;
            Carbohydrate 4
            &bull;
            Protein 4
        </p>
        </section>
    `
    }
}

