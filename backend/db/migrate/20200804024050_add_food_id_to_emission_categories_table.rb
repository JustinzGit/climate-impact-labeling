class AddFoodIdToEmissionCategoriesTable < ActiveRecord::Migration[6.0]
  def change
    add_column :emission_categories, :food_id, :integer
  end
end
