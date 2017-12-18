class AddStartTimeToJamSessions < ActiveRecord::Migration[5.1]
  def change
    add_column :jam_sessions, :start_time, :datetime
  end
end
