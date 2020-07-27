class Emission {
    constructor(food_category, land_use, ghg_emissions, acidifying_emission, 
        eutrophying_emissions, freshwater_withdrawl) 
        {
            this.food_category = food_category
            this.land_use = land_use
            this.ghg_emissions = ghg_emissions
            this.acidifying_emission = acidifying_emission
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
    }
}


