class CreateFoodNutrients < ActiveRecord::Migration[6.0]
  def change
    create_table :food_nutrients do |t|
      t.integer :nutrient_id
      t.integer :food_id

      t.timestamps
    end
  end
end
