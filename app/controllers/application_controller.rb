class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
    include SessionsHelper

  def display_map
    @jam_sessions = JamSession.all.order(:name).paginate(:page => params[:page])
  end
  # def check(current_session)
  #   @not_in_jam_session=GuestSessionAssociation.where(:jam_session_id=>current_session.id, :user_id=> session[:user_id]).nil?
  #   @not_in_jam_session
  # end

  def choice
    # write the code to set this with the choice button
    session[:player]=true
  end
end
