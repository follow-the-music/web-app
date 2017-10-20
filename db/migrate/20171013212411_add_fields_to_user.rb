class AddFieldsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :user_name, :text
    add_column :users, :biography, :text
    add_column :users, :rating, :float
    add_column :users, :longitude, :float
    add_column :users, :latitude, :float
  end
end
