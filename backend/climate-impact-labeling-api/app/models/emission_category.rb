class EmissionCategory < ApplicationRecord
    has_many :food_emissions
    has_many :foods, through: :food_emissions
end
