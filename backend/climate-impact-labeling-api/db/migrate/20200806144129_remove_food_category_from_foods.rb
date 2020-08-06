class RemoveFoodCategoryFromFoods < ActiveRecord::Migration[6.0]
  def change
    remove_column :foods, :food_category, :string
  end
end
