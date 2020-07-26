class Nutrient < ApplicationRecord
    has_many :food_nutrients
    has_many :foods, through: :food_nutrients
end
