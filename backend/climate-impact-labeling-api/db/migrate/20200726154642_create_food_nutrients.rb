class CreateFoodNutrients < ActiveRecord::Migration[6.0]
  def change
    create_table :food_nutrients do |t|
      t.int :nutrient_id
      t.int :food_id

      t.timestamps
    end
  end
end
