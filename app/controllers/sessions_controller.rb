class SessionsController < ApplicationController
  def new

  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      clear_failed_attempt
      redirect_to jam_sessions_path
    else
      declare_failed_attempt_to :login
      redirect_to root_path
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end
end
