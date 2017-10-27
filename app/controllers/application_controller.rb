class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
    include SessionsHelper

  def display_map
    @jam_sessions = JamSession.all
  end


  def choice

  end

end
