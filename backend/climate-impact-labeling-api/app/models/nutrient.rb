class Nutrient < ApplicationRecord
    has_many :food_nutrients
    has_many :foods, through: :food_nutrients

    self.primary_key = "nutrient_id"
end
