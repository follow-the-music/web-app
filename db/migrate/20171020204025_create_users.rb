class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.text :user_name
      t.text :biography
      t.float :rating
      t.float :longitude
      t.float :latitude
      t.timestamps
    end
  end
end
