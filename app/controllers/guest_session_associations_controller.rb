class GuestSessionAssociationsController < ApplicationController
  before_action :set_guest_session_association, only: [:show, :edit, :update, :destroy]

  # GET /guest_session_associations
  # GET /guest_session_associations.json
  def index
    @guest_session_associations = GuestSessionAssociation.all
  end

  # GET /guest_session_associations/1
  # GET /guest_session_associations/1.json
  def show
    @jam_session=JamSession.find(@guest_session_association.jam_session_id)
    @host_name = User.where(id:@jam_session.host_id).pluck(:name)[0]
    @users= User.where(id: GuestSessionAssociation.where(jam_session_id: @jam_session.id).pluck(:user_id))
    @jam_players_count= GuestSessionAssociation.where(jam_session_id: @jam_session.id,player:true).count
    @jam_listeners_count= GuestSessionAssociation.where(jam_session_id: @jam_session.id,player:false).count

  end

  # GET /guest_session_associations/new
  def new
    @guest_session_association = GuestSessionAssociation.new
  end

  # GET /guest_session_associations/1/edit
  def edit
  end

  # POST /guest_session_associations
  # POST /guest_session_associations.json
  def create
    if session[:player]
      @jam_players_count= GuestSessionAssociation.where(jam_session_id: @jam_session.id,player:true).count
      if JamSession.where(id:guest_session_association_params[0]).pluck(:max_players) > @jam_players_count
        @guest_session_association = GuestSessionAssociation.new(user_id:session[:user_id],jam_session_id:guest_session_association_params[0],player:true)
        respond_to do |format|
          if @guest_session_association.save
            format.html { redirect_to @guest_session_association, notice: 'Guest session association was successfully created.' }
            format.json { render :show, status: :created, location: @guest_session_association }
          else
            format.html { render :new }
            format.json { render json: @guest_session_association.errors, status: :unprocessable_entity }
          end
        end
      else
          # show a notice that says its full!
      end
    else
      @jam_listeners_count= GuestSessionAssociation.where(jam_session_id: @jam_session.id,player:false).count
      if JamSession.where(id:guest_session_association_params[0]).pluck(:max_listeners) > @jam_listeners_count
        @guest_session_association = GuestSessionAssociation.new(user_id:session[:user_id],jam_session_id:guest_session_association_params[0],player:false)
        respond_to do |format|
          if @guest_session_association.save
            format.html { redirect_to @guest_session_association, notice: 'Guest session association was successfully created.' }
            format.json { render :show, status: :created, location: @guest_session_association }
          else
            format.html { render :new }
            format.json { render json: @guest_session_association.errors, status: :unprocessable_entity }
          end
        end
      else
          # show a notice that says its full!
      end
    end
  end

  # PATCH/PUT /guest_session_associations/1
  # PATCH/PUT /guest_session_associations/1.json
  def update
    respond_to do |format|
      if @guest_session_association.update(guest_session_association_params)
        format.html { redirect_to @guest_session_association, notice: 'Guest session association was successfully updated.' }
        format.json { render :show, status: :ok, location: @guest_session_association }
      else
        format.html { render :edit }
        format.json { render json: @guest_session_association.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /guest_session_associations/1
  # DELETE /guest_session_associations/1.json
  def destroy
    #params = @_params
    #@guest_session_association=GuestSessionAssociation.where(jam_session_id: params[:jam_session_id], user_id: params[:player])

    @guest_session_association.destroy
    respond_to do |format|
      format.html { redirect_to yoursessions_path, notice: 'Guest session association was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_guest_session_association
      @guest_session_association = GuestSessionAssociation.new(user_id:session[:user_id],jam_session_id:params[:id],player:params[:player])
      @guest_session_association.save!
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def guest_session_association_params
      params.require(:guest_session_association).permit(:jam_session_id, :player)
    end
end
