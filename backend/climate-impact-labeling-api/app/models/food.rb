class Food < ApplicationRecord
    belongs_to :emission_category, optional: true
    
    self.primary_key = "fdc_id"

    # Search by product name
    def self.search(name)
        where("name LIKE (?)", "%#{name}%")
    end
end
