class AddEndTimeToJamSessions < ActiveRecord::Migration[5.1]
  def change
    add_column :jam_sessions, :end_time, :datetime
  end
end
