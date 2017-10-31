class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
    include SessionsHelper

    @jam_sessions = JamSession.all

    @hash = Gmaps4rails.build_markers(@jam_sessions) do |jam_session, marker|
      marker.lat jam_session.latitude
      marker.lng jam_session.longitude
    end

  def display_map
        @jam_sessions = JamSession.all


  end

end
