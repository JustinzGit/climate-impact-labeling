class Food < ApplicationRecord
    has_many :food_emission_categories
    has_many :emission_categories, through: :food_emission_categories
    
    self.primary_key = "fdc_id"

    # Search by product name
    def self.search(name)
        where("name LIKE (?)", "%#{name}%")
    end
end
