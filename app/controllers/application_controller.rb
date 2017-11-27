class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
    include SessionsHelper
    def choice
      # write the code to set this with the choice button
      @display_play=false
      @display_listen=false
      if params[:play]==true
        # session[:player]=true
        @display_play=true
      end
      if params[:listen]==TRUE
        @display_listen=true
      end
    end
end
