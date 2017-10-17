class RemoveFLoatFromJamSessions < ActiveRecord::Migration[5.1]
  def change
    remove_column :jam_sessions, :float, :string
  end
end
