class Food < ApplicationRecord
    has_many :food_emissions
    has_many :emissions, through: :food_emissions

    has_many :food_nutrients
    has_many :nutrients, through: :food_nutrients
end
