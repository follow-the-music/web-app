class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    # add_column :users, :city, :string
    change_table :users do |t|
      t.string :name
      t.string :email
      t.string :city
      t.string :genre
      t.string :instruments
      t.string :fav_artist
      t.string :playlist
      t.string :links
      t.string :intro_message

      t.timestamps
    end
  end
end
