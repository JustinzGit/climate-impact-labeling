class ChangeColumnNameOnFoodEmissionCategories < ActiveRecord::Migration[6.0]
  def change
    rename_column :food_emission_categories, :emission_id, :emission_category_id
  end
end
