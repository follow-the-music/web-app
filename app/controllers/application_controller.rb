class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
    include SessionsHelper

  def display_map
    # if params[:play]==true
    #   @jam_sessions= JamSession.where("max_players > jam_players_count", {jam_players_count: JamSession.count_p}).order(:name).paginate(:page => params[:page])
    # end
    #   # @jam_sessions = JamSession.where().order(:name).paginate(:page => params[:page])
    #   @jam_sessions= JamSession.where("max_players > jam_players_count", {jam_players_count: JamSession.count_p}).order(:name).paginate(:page => params[:page])
    # elsif @display_listen
    #   @jam_sessions= JamSession.where("max_listeners > jam_listeners_count", {jam_listeners_count: JamSession.count_l}).order(:name).paginate(:page => params[:page])
    # else
    #    @jam_sessions = JamSession.order(:name).paginate(:page => params[:page])
    # end
    @filterrific = initialize_filterrific(
      JamSession,
      params[:filterrific],
      persistence_id: 'shared_key',
     default_filter_params: {},
     available_filters: [],
    ) or return
    @jam_sessions = @filterrific.find.page(params[:page])
    respond_to do |format|
      format.html
      format.js
    end
  end

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
