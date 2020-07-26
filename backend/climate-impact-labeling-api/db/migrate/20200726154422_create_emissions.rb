class CreateEmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :emissions do |t|
      t.string :food_category
      t.int :land_use
      t.int :ghg_emissions
      t.int :acidifying_emissions
      t.int :eutrophying_emissions
      t.int :freshwater_withdrawl

      t.timestamps
    end
  end
end
