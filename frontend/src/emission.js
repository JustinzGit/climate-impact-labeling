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

        emissionDiv.innerHTML +=
        `
        <h2>Emission Category</h2>
            <p>${this.category}</p>
        `

        let data = [{ 
            data: {
                "Green House Gas Emissions": this.ghg,
                "Freshwater Withdrawls": this.water_withdrawl,
                "Eutrophying Emissions": this.eutrophication,
                "Acidification": this.acid,
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

        new Chartkick.BarChart("chart-1", data, {legend: false})
    }
}

function assignColor(data, value){
    let range
    switch(data){
        case "ghg":
            range = [2, 30]
        case "water":
            range = [40, 900]
        case "eutrophication":
            range = [10, 70]
        case "acid":
            range = [15, 90]
        case "land":
            range = [21, 60]
    }

    if (value < range[0]) return "#1aa260"
    else if (value >= range[0] && value < range[1]) return "orange"
    else if (value >= range[1]) return "#de5246"
   
}