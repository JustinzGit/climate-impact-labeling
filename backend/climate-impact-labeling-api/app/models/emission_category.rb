class EmissionCategory < ApplicationRecord
    has_many :food_emission_categories
    has_many :foods, through: :food_emission_categories
end
