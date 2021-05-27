class CreateEmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :emissions do |t|
      t.string :food_category
      t.integer :land_use
      t.integer :ghg_emissions
      t.integer :acidifying_emissions
      t.integer :eutrophying_emissions
      t.integer :freshwater_withdrawl

      t.timestamps
    end
  end
end
