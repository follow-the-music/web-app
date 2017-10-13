class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    # add_column :users, :city, :string
    change_table :users do |t|
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
