class AddAddressToJamSessions < ActiveRecord::Migration[5.1]
  def change
    add_column :jam_sessions, :address, :string
  end
end
