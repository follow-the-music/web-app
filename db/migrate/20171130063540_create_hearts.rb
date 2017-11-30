class CreateHearts < ActiveRecord::Migration[5.1]
  def change
    create_table :hearts do |t|
      t.integer :user_id
      t.integer :jam_session_id

      t.timestamps
    end
  end
end
