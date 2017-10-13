json.extract! guest_session_association, :id, :user_id, :session_id, :player, :created_at, :updated_at
json.url guest_session_association_url(guest_session_association, format: :json)
