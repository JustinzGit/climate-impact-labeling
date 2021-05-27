class DropFoodEmissionCategoryTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :food_emission_categories
  end
end
