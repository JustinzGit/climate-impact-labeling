class AddColumnsToNutrients < ActiveRecord::Migration[6.0]
  def change
    add_column :nutrients, :food_id, :integer
    add_column :nutrients, :calories, :integer
    add_column :nutrients, :total_fat, :integer
    add_column :nutrients, :saturated_fat, :integer   
    add_column :nutrients, :trans_fat, :integer
    add_column :nutrients, :cholesterol, :integer
    add_column :nutrients, :sodium, :integer
    add_column :nutrients, :carbohydrate, :integer
    add_column :nutrients, :fiber, :integer
    add_column :nutrients, :sugars, :integer
    add_column :nutrients, :protein, :integer
    add_column :nutrients, :vitamin_a, :integer
    add_column :nutrients, :vitamin_c, :integer
    add_column :nutrients, :calcium, :integer
    add_column :nutrients, :iron, :integer
  end
end