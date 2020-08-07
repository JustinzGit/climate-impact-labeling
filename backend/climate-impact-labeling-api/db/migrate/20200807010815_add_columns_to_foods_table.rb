class AddColumnsToFoodsTable < ActiveRecord::Migration[6.0]
  def change
    add_column :foods, :calories, :integer
    add_column :foods, :total_fat, :integer
    add_column :foods, :saturated_fat, :integer   
    add_column :foods, :trans_fat, :integer
    add_column :foods, :cholesterol, :integer
    add_column :foods, :sodium, :integer
    add_column :foods, :carbohydrate, :integer
    add_column :foods, :fiber, :integer
    add_column :foods, :sugars, :integer
    add_column :foods, :protein, :integer
    add_column :foods, :vitamin_a, :integer
    add_column :foods, :vitamin_c, :integer
    add_column :foods, :calcium, :integer
    add_column :foods, :iron, :integer
  end
end
