class RemoveFoodIdFromEmissionCategories < ActiveRecord::Migration[6.0]
  def change
    remove_column :emission_categories, :food_id, :integer
  end
end
