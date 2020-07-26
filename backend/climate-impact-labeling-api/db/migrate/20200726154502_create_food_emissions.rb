class CreateFoodEmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :food_emissions do |t|
      t.int :food_id
      t.int :emission_id

      t.timestamps
    end
  end
end
