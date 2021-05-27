class ChangeFdcIdColumnTypeOnFoods < ActiveRecord::Migration[6.0]
  def change
    change_column :foods, :fdc_id, :bigint
  end
end
