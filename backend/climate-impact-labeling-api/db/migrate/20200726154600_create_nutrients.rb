class CreateNutrients < ActiveRecord::Migration[6.0]
  def change
    create_table :nutrients do |t|
      t.int :nutrient_id
      t.string :name
      t.string :unit_name

      t.timestamps
    end
  end
end
