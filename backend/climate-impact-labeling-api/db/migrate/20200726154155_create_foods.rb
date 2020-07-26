class CreateFoods < ActiveRecord::Migration[6.0]
  def change
    create_table :foods do |t|
      t.int :fdc_id
      t.string :brand_owner
      t.int :gtin_upc
      t.string :ingredients
      t.int :serving_size
      t.string :household_serving_fulltext
      t.string :food_category

      t.timestamps
    end
  end
end
