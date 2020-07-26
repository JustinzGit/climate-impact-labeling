class CreateFoods < ActiveRecord::Migration[6.0]
  def change
    create_table :foods do |t|
      t.integer :fdc_id
      t.string :brand_owner
      t.integer :gtin_upc
      t.string :ingredients
      t.integer :serving_size
      t.integer :serving_size_unit
      t.string :household_serving_fulltext
      t.string :food_category

      t.timestamps
    end
  end
end
