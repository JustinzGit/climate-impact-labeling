class ChangeColumnTypeOnFoodsTable < ActiveRecord::Migration[6.0]
  def change
    change_column :foods, :serving_size_unit, :string
  end
end
