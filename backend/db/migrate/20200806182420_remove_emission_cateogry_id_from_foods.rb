class RemoveEmissionCateogryIdFromFoods < ActiveRecord::Migration[6.0]
  def change
    remove_column :foods, :emission_category_id, :integer
  end
end
