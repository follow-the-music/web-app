json.extract! jam_session, :id, :longitude, :latitude, :host_id, :max_players, :max_listeners, :name, :description, :created_at, :updated_at
json.url jam_session_url(jam_session, format: :json)
