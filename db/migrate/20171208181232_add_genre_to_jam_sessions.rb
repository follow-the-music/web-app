class AddGenreToJamSessions < ActiveRecord::Migration[5.1]
  def change
    add_column :jam_sessions, :genre, :string
  end
end
