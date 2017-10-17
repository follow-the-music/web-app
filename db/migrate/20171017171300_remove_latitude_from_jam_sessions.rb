class RemoveLatitudeFromJamSessions < ActiveRecord::Migration[5.1]
  def change
    remove_column :jam_sessions, :latitude, :string
  end
end
