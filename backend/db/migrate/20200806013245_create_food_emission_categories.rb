class CreateFoodEmissionCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :food_emission_categories do |t|
      t.integer :food_id
      t.integer :emission_id

      t.timestamps
    end
  end
end
