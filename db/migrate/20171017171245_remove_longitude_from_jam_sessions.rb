class RemoveLongitudeFromJamSessions < ActiveRecord::Migration[5.1]
  def change
    remove_column :jam_sessions, :longitude, :string
  end
end
