class CreateChatMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_messages do |t|
      t.text :content
      t.integer :author_id
      t.integer :jam_session_id

      t.timestamps
    end
  end
end
