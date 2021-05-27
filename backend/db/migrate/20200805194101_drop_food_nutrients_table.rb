class DropFoodNutrientsTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :food_nutrients
  end
end
