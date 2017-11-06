class JamSessionsController < ApplicationController
  before_action :set_jam_session, only: [:show, :edit, :update, :destroy]

  # GET /jam_sessions
  # GET /jam_sessions.json
  def index
    @jam_sessions = JamSession.order(:name)
    self.all_sessions_json
  end

  def all_sessions_json
   render :text=>(@sessions).to_json
  end

  # GET /jam_sessions/1
  # GET /jam_sessions/1.json
  def show
    @name = User.where(id:@jam_session.host_id).pluck(:name)

    @users= User.where(id: GuestSessionAssociation.where(jam_session_id: @jam_session.id).distinct.pluck(:user_id))
    @jam_players_count= GuestSessionAssociation.where(jam_session_id: @jam_session.id,player:true).distinct.count
    @jam_listeners_count= GuestSessionAssociation.where(jam_session_id: @jam_session.id,player:false).distinct.count
    @chat_messages = ChatMessage.where(jam_session_id: @jam_session.id).sort_by { |message| message.created_at}

  end

  # GET /jam_sessions/new
  def new
    @jam_session = JamSession.new()
  end

  # GET /jam_sessions/1/edit
  def edit
  end

  # POST /jam_sessions
  # POST /jam_sessions.json
  def create
    @jam_session = JamSession.new(jam_session_params)
    @jam_session.host_id=session[:user_id]
    respond_to do |format|
      if @jam_session.save
        @guest=GuestSessionAssociation.new(jam_session_id: @jam_session.id, user_id:session[:user_id], player:true)
        @guest.save!
        format.html { redirect_to @jam_session, notice: 'Jam session was successfully created.' }
        format.json { render :show, status: :created, location: @jam_session }
      else
        format.html { render :new }

        format.json { render json: @jam_session.errors, status: :unprocessable_entity }
      end
    end


  end

  # PATCH/PUT /jam_sessions/1
  # PATCH/PUT /jam_sessions/1.json
  def update
    respond_to do |format|
      if @jam_session.update(jam_session_params)
        format.html { redirect_to @jam_session, notice: 'Jam session was successfully updated.' }
        format.json { render :show, status: :ok, location: @jam_session }
      else
        format.html { render :edit }
        format.json { render json: @jam_session.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /jam_sessions/1
  # DELETE /jam_sessions/1.json
  def destroy
    @jam_session.destroy
    @guests= GuestSessionAssociation.where(jam_session_id: @jam_session.id)
    @guests.destroy_all
    respond_to do |format|
      format.html { redirect_to guest_session_associations_path, notice: 'Jam session was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  def host_name(host_id)
    JamSession.host_name(host_id)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_jam_session
      @jam_session = JamSession.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def jam_session_params
      params.require(:jam_session).permit(:longitude, :latitude, :host_id, :max_players, :max_listeners, :name, :description, :address)
    end
end
