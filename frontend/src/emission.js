class Emission {
    constructor(food_category, land_use, ghg_emissions, acidifying_emissions, 
        eutrophying_emissions, freshwater_withdrawl) 
        {
            this.food_category = food_category
            this.land_use = land_use
            this.ghg_emissions = ghg_emissions
            this.acidifying_emissions = acidifying_emissions
            this.eutrophying_emissions = eutrophying_emissions
            this.freshwater_withdrawl = freshwater_withdrawl
        }

    
    renderEmission() {
        let emissionDiv = document.getElementById("emission")

        emissionDiv.innerHTML +=
        `
        <h2>Emission Category</h2>
            <p>${this.food_category}</p>
        `

        let data = [{ 
            data: {
                "Green House Gas Emissions": this.ghg_emissions,
                "Freshwater Withdrawls": this.freshwater_withdrawl,
                "Eutrophying Emissions": this.eutrophying_emissions,
                "Acidification": this.acidifying_emissions,
                "Land Usage": this.land_use 
            },
            color: [assignColor("ghg", this.ghg_emissions), assignColor("water", this.freshwater_withdrawl),
                    assignColor("eutrophying", this.eutrophying_emissions), assignColor("acid", this.acidifying_emissions),
                    assignColor("land", this.land_use)]
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
        case "eutrophying":
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