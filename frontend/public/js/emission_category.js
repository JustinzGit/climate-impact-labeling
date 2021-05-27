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

    
    renderEmissionCategory() {
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

        let dataRange = [10, 30]
        let emissionDiv = document.getElementById("emission-category")
    
        if (this.ghg < dataRange[0]){
            emissionDiv.innerHTML =
            `
                <h2>Greenhouse Gas Emissions: <b style="color: #1aa260;">Low</b></h2>
                <p>Choosing more products of this category lowers your carbon footprint!</p>
                <b>${this.category}</b>
            `
        }
        else if (this.ghg >= dataRange[0] && this.ghg < dataRange[1]){
            emissionDiv.innerHTML =
            `
                <h2>Greenhouse Gas Emissions: <b style="color: #ffc107;">Moderate</b></h2>
                <p>Choosing products of this category are smart alternatives to those with high emissions</p>
                <b>${this.category}</b>
            `
        }
        else if (this.ghg >= dataRange[1]){
            emissionDiv.innerHTML =
            `
                <h2>Greenhouse Gas Emissions: <b style="color: #de5246";>High</b></h2>
                <p>Limiting your consumption of these products to once or twice a week<br>can make a huge difference on green house emssions</p>
                <b>${this.category}</b>
            `
        }
        
        // Reveal Chart
        document.getElementById("product-emissions-chart",).style.display = "block"
        new Chartkick.ColumnChart("product-emissions-chart", data, {legend: false})

        function assignColumnColor(data, value){
            let dataRange
        
            switch(data){
                case "ghg":
                    dataRange = [10, 30]
                    break
                case "water":
                    dataRange = [40, 900]
                    break
                case "eutrophication":
                    dataRange = [10, 70]
                    break
                case "acid":
                    dataRange = [15, 90]
                    break
                case "land":
                    dataRange = [21, 60]
                    break
            }
        
            if (value < dataRange[0]) return "#1aa260"
            else if (value >= dataRange[0] && value < dataRange[1]) return "#ffc107"
            else if (value >= dataRange[1]) return "#de5246"
        }
    }
}


