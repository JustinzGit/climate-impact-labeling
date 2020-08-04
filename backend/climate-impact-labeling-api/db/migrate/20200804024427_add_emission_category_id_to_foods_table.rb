class AddEmissionCategoryIdToFoodsTable < ActiveRecord::Migration[6.0]
  def change
    add_column :foods, :emission_category_id, :integer
  end
end
