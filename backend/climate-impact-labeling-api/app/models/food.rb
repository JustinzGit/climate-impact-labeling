class Food < ApplicationRecord
    has_many :food_emissions
    has_many :emission_categories, through: :food_emissions

    has_many :food_nutrients
    has_many :nutrients, through: :food_nutrients

    self.primary_key = "fdc_id"

    # Search by product name
    def self.search(name)
        where("name LIKE (?)", "%#{name}%")
    end
end
