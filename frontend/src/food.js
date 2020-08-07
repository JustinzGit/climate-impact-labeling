class Food {
    constructor(id, name, owner, barcode, ingredients, serving_size, serving_size_unit, calcium, calories, 
        carbohydrates, cholesterol, fiber, iron, protein, saturated_fat, sodium, sugars, 
        total_fat, trans_fat, vitamin_a, vitamin_c, emission_category)
    {
        this.id = id
        this.name = name
        this.owner = owner
        this.barcode = barcode
        this.ingredients = ingredients
        this.serving_size = serving_size
        this.serving_size_unit = serving_size_unit
        this.calcium = calcium
        this.calories = calories
        this.carbohydrates = carbohydrates
        this.cholesterol = cholesterol
        this.fiber = fiber
        this.iron = iron
        this.protein = protein
        this.saturated_fat = saturated_fat
        this.sodium = sodium
        this.sugars = sugars
        this.total_fat = total_fat
        this.trans_fat = trans_fat
        this.vitamin_a = vitamin_a
        this.vitamin_c = vitamin_c
        this.emission_category = emission_category
    }

    renderFood() {
        document.getElementById("product-info").innerHTML = 
        `
        <h2>Product Details</h2>
            <br>
            <h4>${this.name}</h4>
            <p><b>Brand Owner:</b> ${this.owner}</p>
        `

        document.getElementById("ingredients").innerHTML = 
        `<b>Ingredients</b><p>${this.ingredients}</p>`

        // Formats data properly for nutrition label
        function formatData(nutrient){
            if (nutrient === undefined || nutrient === null){
                return `<b style="color: red;">(N/A)</b>`
            }
            else {
                return nutrient
            }
        }

        // Calculates fat calories for nutrition label
        function calculateFatCalories(fat_amount){
            if (fat_amount === undefined){
                return `<b style="color: red;">(N/A)</b>`
            }
            else {
                return fat_amount * 9
            }
        }
        
        // Insertion of nutrition label
        document.getElementById("nutrition").innerHTML = 
        `
        <section class="performance-facts">
        <header class="performance-facts__header">
            <h1 class="performance-facts__title">Nutrition Facts</h1>
            <p>Serving Size: ${formatData(this.serving_size)} ${formatData(this.serving_size_unit)}
        </header>
        <table class="performance-facts__table">
            <thead>
            <tr>
                <th colspan="3" class="small-info">Amount Per Serving</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th colspan="2"><b>Calories</b> ${formatData(this.calories)}</th>
                <td>Calories from Fat ${calculateFatCalories(this.total_fat)}</td>
            </tr>
            <tr class="thick-row">
                <td colspan="3" class="small-info"><b>% Daily Value*</b></td>
            </tr>
            <tr>
                <th colspan="2"><b>Total Fat</b> ${formatData(this.total_fat)}g</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Saturated Fat ${formatData(this.saturated_fat)}g</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Trans Fat ${formatData(this.trans_fat)}g</th>
                <td></td>
            </tr>
            <tr>
                <th colspan="2"><b>Cholesterol</b> ${formatData(this.cholesterol)}mg</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <th colspan="2"><b>Sodium</b> ${formatData(this.sodium)}mg</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <th colspan="2"><b>Total Carbohydrate</b> ${formatData(this.carbohydrates)}g</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Dietary Fiber ${formatData(this.fiber)}g</th>
                <td><b>*%</b></td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Sugars ${formatData(this.sugars)}g</th>
                <td></td>
            </tr>
            <tr class="thick-end">
                <th colspan="2"><b>Protein</b> ${formatData(this.protein)}g</th>
                <td></td>
            </tr>
            </tbody>
        </table>
    
        <table class="performance-facts__table--grid">
            <tbody>
            <tr>
                <td colspan="2">Vitamin A ${formatData(this.vitamin_a)} IU *%</td>
                <td>Vitamin C ${formatData(this.vitamin_c)}mg *%</td>
            </tr>
            <tr class="thin-end">
                <td colspan="2">Calcium ${formatData(this.calcium)}mg *%</td>
                <td>Iron ${formatData(this.iron)}mg *%</td>
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
        

