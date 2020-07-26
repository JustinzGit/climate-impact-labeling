class FoodEmission < ApplicationRecord
    belongs_to :food 
    belongs_to :emission
end
