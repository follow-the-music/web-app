json.extract! chat_message, :id, :content, :author_id, :jam_session_id, :created_at, :updated_at
json.url chat_message_url(chat_message, format: :json)
