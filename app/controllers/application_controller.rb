class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
    include SessionsHelper

    @jam_sessions = JamSession.all

  def display_map
    @jam_sessions = JamSession.all    

  end

end
