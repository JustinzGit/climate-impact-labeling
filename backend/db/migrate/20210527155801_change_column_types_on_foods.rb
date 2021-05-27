class ChangeColumnTypesOnFoods < ActiveRecord::Migration[6.0]
  def change
    change_column :foods, :fdc_id, :int
    change_column :foods, :gtin_upc, :bigint
  end
end
