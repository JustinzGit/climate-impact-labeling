class EmissionCategory {
    constructor(category, land_use, ghg, acid, 
        eutrophication, water_withdrawl) 
        {
            this.category = category
            this.land_use = land_use
            this.ghg = ghg
            this.acid = acid
            this.eutrophication = eutrophication
            this.water_withdrawl = water_withdrawl
        }

    
    renderEmissionCategoryChart() {
        let emissionDiv = document.getElementById("emission-category")

        let data = [{ 
            data: {
                "GHG Emissions": this.ghg,
                "Freshwater Withdrawls": this.water_withdrawl,
                "Eutrophying Emissions": this.eutrophication,
                "Acidifying Emissions": this.acid,
                "Land Usage": this.land_use 
            },
            color: [
                assignColumnColor("ghg", this.ghg), 
                assignColumnColor("water", this.water_withdrawl),
                assignColumnColor("eutrophication", this.eutrophication), 
                assignColumnColor("acid", this.acid),
                assignColumnColor("land", this.land_use)
                ]
        }]

        emissionDiv.innerHTML = `<b>${this.category}</b>`
        assignRating(this.ghg)

        // Reveal Chart
        document.getElementById("product-emissions-chart",).style.display = "block"
        new Chartkick.ColumnChart("product-emissions-chart", data, {legend: false})

        function assignColumnColor(data, value){
            let range
        
            switch(data){
                case "ghg":
                    range = [10, 30]
                    break
                case "water":
                    range = [40, 900]
                    break
                case "eutrophication":
                    range = [10, 70]
                    break
                case "acid":
                    range = [15, 90]
                    break
                case "land":
                    range = [21, 60]
                    break
            }
        
            if (value < range[0]) return "#1aa260"
            else if (value >= range[0] && value < range[1]) return "#ffc107"
            else if (value >= range[1]) return "#de5246"
        }

        function assignRating(value){
            let range = [10, 30]
            let emissionCategoryDiv = document.getElementById("emission-category")
        
            if (value < range[0]){
                emissionCategoryDiv.innerHTML =
                `
                  <h3>Greenhouse Gas Emissions: <b style="color: #1aa260;">Low</b></h3>
                  <p>Choosing more products of this category lowers your carbon footprint!</p>
                `
            }
            else if (value >= range[0] && value < range[1]){
                emissionCategoryDiv.innerHTML =
                `
                  <h3>Greenhouse Gas Emissions: <b style="color: #ffc107;">Moderate</b></h3>
                  <p>Choosing products of this category are smart alternatives to those with high emissions</p>
                `
            }
            else if (value >= range[1]){
                emissionCategoryDiv.innerHTML =
                `
                  <h3>Greenhouse Gas Emissions: <b style="color: #de5246";>High</b></h3>
                  <p>Limiting your consumption of these products to once or twice a week<br>can make a huge difference on green house emssions</p>
                `
            }
        }
    }
}


