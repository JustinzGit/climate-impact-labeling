class ChangeNutrientsTableNameToNutritions < ActiveRecord::Migration[6.0]
  def change
    rename_table :nutrients, :nutritions
  end
end
