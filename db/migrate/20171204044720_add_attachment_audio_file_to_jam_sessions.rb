class AddAttachmentAudioFileToJamSessions < ActiveRecord::Migration[5.0]
  def self.up
    change_table :jam_sessions do |t|
      t.attachment :audio_file
    end
  end

  def self.down
    remove_attachment :jam_sessions, :audio_file
  end
end
