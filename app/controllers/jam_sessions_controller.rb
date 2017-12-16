require 'nokogiri'
require 'open-uri'
class JamSessionsController < ApplicationController
  before_action :set_jam_session, only: [:show, :edit, :update, :destroy]

  # GET /jam_sessions
  # GET /jam_sessions.json
  def index

     @your_sessions= JamSession.where(id: GuestSessionAssociation.where(user_id: current_user.id).pluck(:jam_session_id)).order(:name).paginate(page: params[:your_sessions_page])
     @jam_sessions= JamSession.search(params[:host_search],params[:name_search], params[:genre_search], params[:time_search]).order(:name).paginate(:page => params[:jam_sessions_page])

  end

  def tabs_index
    client = Geetar::Client.new
    if params[:tab]!=nil
        @search = Geetar::Search.new(client, params[:tab])
    end
  end

def set_audio
  @sound = jam_session_params[:audio]
end

  # def upload_file
  #   filename = params[:filename]
  #   audio = request.raw_post
  #   File.open(filename, 'w+b'){|file| file.puts audio}
  #
  #   respond_to do | format |
  #    format.json { render json: { status: 202 } }
  #   end
  # end

  def tab_show
    @url=params[:url]
    require 'net/http'
    @result = Net::HTTP.get(URI.parse('https://www.songsterr.com/a/ra/songs/byartists.xml?artists=Metallica,"Led%20Zeppelin"'))
    @result2 = Net::HTTP.get(URI.parse('https://www.songsterr.com/a/wa/bestMatchForQueryString?s={all i want}&a={kodaline}'))

    # # result = Net::HTTP.get(URI.parse('http://www.example.com'), '/about.html')
    # render :xml => @result
    xml = Nokogiri::XML(@result)
    @artists = xml.xpath("//artist//name")
    # items = Hash.from_xml(xml.to_xml)
    # @all_items = Array.new
    #   items['item'].map do |item|
    #     new = Item.new
    #     new.title = item['title']
    #     @all_items.push(new)
    #   end
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
    set_audio
    # params[:audio_file]=@sound
    @jam_session = JamSession.new(jam_session_params)
    @jam_session.host_id=session[:user_id]
    byebug
    @jam_session.audio_file=@sound
    # @jam_session.audio=


    respond_to do |format|
      if @jam_session.save

        format.html { redirect_to jam_sessions_path, notice: 'Jam session was successfully created.' }
        format.json { render :show, status: :created, location: @jam_session }

      else
        format.html { render :new }

        format.json { render json: @jam_session.errors, status: :unprocessable_entity }
      end
    end
    @association=GuestSessionAssociation.new(user_id:@jam_session.host_id, jam_session_id: @jam_session.id, player:true)
    @association.save

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
      format.html { redirect_to jam_sessions_path }
      format.json { head :no_content }
    end
  end

  def host_name(host_id)
    JamSession.host_name(host_id)
  end

  def stop_recording
    respond_to do |format|
      recordLive.js { }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_jam_session
      @jam_session = JamSession.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def jam_session_params
      params.require(:jam_session).permit(:longitude, :latitude, :host_id, :max_players, :max_listeners, :name, :description, :address, :tab,:url, :audio, :audio_file,:sound, :genre, :host_search, :name_search, :your_sessions_page, :jam_sessions_page, :reset, :genre_search, :start_time, :end_time, :time_search)
    end
end
