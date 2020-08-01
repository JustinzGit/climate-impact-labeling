class Emission {
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

    
    renderEmission() {
        let emissionDiv = document.getElementById("emission")
        
        // Remove previous category label
        emissionDiv.innerHTML = ""

        emissionDiv.innerHTML +=
        `
        <h2>Emission Category</h2>
            <b>${this.category}</b>
        `
        let data = [{ 
            data: {
                "GHG Emissions": this.ghg,
                "Freshwater Withdrawls": this.water_withdrawl,
                "Eutrophying Emissions": this.eutrophication,
                "Acidifying Emissions": this.acid,
                "Land Usage": this.land_use 
            },
            color: [
                assignColor("ghg", this.ghg), 
                assignColor("water", this.water_withdrawl),
                assignColor("eutrophication", this.eutrophication), 
                assignColor("acid", this.acid),
                assignColor("land", this.land_use)
                ]
        }]
        // Reveal Chart
        document.getElementById("product-emissions-chart",).style.display = "block"

        new Chartkick.ColumnChart("product-emissions-chart", data, {legend: false})
    }
}

function assignColor(data, value){
    let range
    switch(data){
        case "ghg":
            range = [2, 30]
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