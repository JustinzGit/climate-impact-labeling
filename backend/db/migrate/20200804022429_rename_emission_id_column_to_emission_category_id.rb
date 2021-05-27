class RenameEmissionIdColumnToEmissionCategoryId < ActiveRecord::Migration[6.0]
  def change
    rename_column :food_emissions, :emission_id, :emission_category_id
  end
end
