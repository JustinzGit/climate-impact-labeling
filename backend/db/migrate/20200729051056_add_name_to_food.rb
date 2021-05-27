class AddNameToFood < ActiveRecord::Migration[6.0]
  def change
    add_column :foods, :name, :string
  end
end
