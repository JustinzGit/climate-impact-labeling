class Food < ApplicationRecord
    belongs_to :emission_category

    has_many :food_nutrients
    has_many :nutrients, through: :food_nutrients

    self.primary_key = "fdc_id"

    # Search by product name
    def self.search(name)
        where("name LIKE (?)", "%#{name}%")
    end
end
