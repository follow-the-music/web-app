class CreateJamSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :jam_sessions do |t|
      t.integer :host_id
       t.integer :max_players
       t.integer :max_listeners
       t.text :name
       t.text :description
       t.float :longitude
       t.float :latitude
       t.timestamps

    end
  end
end
