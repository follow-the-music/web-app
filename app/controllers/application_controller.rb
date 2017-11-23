class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
    include SessionsHelper

  def choice
    # write the code to set this with the choice button
    session[:player]=true
  end
end
