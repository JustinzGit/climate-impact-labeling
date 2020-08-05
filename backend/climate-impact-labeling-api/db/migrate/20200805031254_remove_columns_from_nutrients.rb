class RemoveColumnsFromNutrients < ActiveRecord::Migration[6.0]
  def change
    remove_column :nutrients, :nutrient_id, :integer
    remove_column :nutrients, :name, :string
    remove_column :nutrients, :unit_name, :string
  end
end