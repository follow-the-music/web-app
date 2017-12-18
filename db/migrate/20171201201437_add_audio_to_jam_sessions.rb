class AddAudioToJamSessions < ActiveRecord::Migration[5.1]
  def change
    add_column :jam_sessions, :audio, :binary
  end
end
