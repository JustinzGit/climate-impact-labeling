class RenameEmissionsToEmissionCategories < ActiveRecord::Migration[6.0]
  def change
    rename_table :emissions, :emission_categories
  end
end
