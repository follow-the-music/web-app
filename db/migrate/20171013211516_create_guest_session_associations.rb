class CreateGuestSessionAssociations < ActiveRecord::Migration[5.1]
  def change
    create_table :guest_session_associations do |t|
      t.integer :user_id
      t.integer :session_id
      t.boolean :player

      t.timestamps
    end
  end
end
