class DropFoodEmissionsTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :food_emissions
  end
end
