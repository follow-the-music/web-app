class JamSession < ApplicationRecord
  has_many :chat_messages
  has_many :guest_session_associations
  geocoded_by :address
  after_validation :geocode
  self.per_page = 6
  # filterrific(
  #   available_filters: [
  #     :search_query_address,
  #     :search_query_jam_name,
  #     :search_query_host_name,
  #     :select_genre
  #   ]
  # )
  def host_name(host_id)
    @name= User.where(id:host_id).pluck(:name)
  end
  def self.search(search_host, search_name, search_genre, search_time)
    # if search_host.blank? && search_name.blank?
      # return JamSession.all.order(:name).paginate(:page => params[:jam_sessions_page])
      @jam_sessions=JamSession.where('end_time >= ?',DateTime.now.change(offset: "-3000")-30.minutes)
      # @jam_sessions=JamSession.all
    if (!search_host.blank?)
      user_id=User.where("name LIKE ?", "%#{search_host}%").pluck(:id)
      @jam_sessions= @jam_sessions.where(host_id:user_id)
    end
    if (!search_name.blank?)
      @jam_sessions= @jam_sessions.where("name LIKE ?", "%#{search_name}%").or(@jam_sessions.where("description LIKE ?", "%#{search_name}%"))
    end
    if (!search_genre.blank?)
      @jam_sessions= @jam_sessions.where(genre:search_genre)
    end
    if (!search_time.blank?)
      # @jam_sessions = @jam_sesions.where("name LIKE ?", "calisiyor")

      if search_time=='1'
        # now
        # starting within 30 minutes and ending after current time
        upper_bound=DateTime.now+ 30.minutes
      elsif search_time =='2'
        #3 hours
        # starting within the next 3 hours and ending after current time
        upper_bound =DateTime.now + 3.hours
      elsif search_time == '3'
        #12 hours
        #starting within the next 12 hours and ending after current time_search
        upper_bound =DateTime.now + 12.hours
      elsif search_time =='4'
        #24 hours
        #starting within the next 24 hours and ending after current time
        upper_bound =DateTime.now + 24.hours
      end
      @jam_sessions= @jam_sessions.where('start_time >= ? AND start_time <= ? AND end_time  > ? OR (end_time < ? AND end_time > ?)', DateTime.now.change(offset: "-3000"), upper_bound.change(offset: "-3000"), DateTime.now.change(offset: "-3000"), upper_bound.change(offset: "-3000"), DateTime.now.change(offset: "-3000") )
    end
    @jam_sessions
  end


  def self.host_search(search)
    return nil if search.blank?
    user_id=User.where("name LIKE ?", "%#{search}%").pluck(:id)
    JamSession.where(host_id:user_id)
  end
  def self.name_search(search)
    return nil if search.blank?
    JamSession.where("name LIKE ?", "%#{search_query}%").or(JamSession.where("description LIKE ?", "%#{search_query}%"))
  end
  def self.count_p
    GuestSessionAssociation.where(jam_session_id:self.id, player:TRUE).count
  end
  def self.count_l
    GuestSessionAssociation.where(jam_session_id:self.id, player:FALSE).count
  end
  scope :search_query_jam_name, lambda { |search_query_jam_name|
    return nil if search_query.blank?
    # where("name LIKE ? OR descripton LIKE ?", search_query, search_query)
    JamSession.where("name LIKE ?", "%#{search_query}%").or(JamSession.where("description LIKE ?", "%#{search_query}%")).or(JamSession.where("address LIKE ?", "%#{search_query}%"))
  }
  scope :search_query_host_name, lambda { |search_query_host_name|
    return nil if search_query.blank?
    # where("name LIKE ? OR descripton LIKE ?", search_query, search_query)
    user_id=User.where("name LIKE ?", "%#{search_query_host_name}%").pluck(:id)
    JamSession.where("host_id LIKE ?", "%#{user_id}%")
  }
  scope :select_genre, lambda { |select_genre|
    JamSession.where(genre: [select_genre])
  }
  def self.options_for_select
    ["pop","rock","jazz","soul","metal","house"]
  end
  def search_near
    @userLocation = request.location #gets the ip of the user
    # @searchResults = Geocoder.search(search_locations)
    # @locations = @searchResults.near(@userLocation, 50, :order => :distance)
  end
  # has_attached_file :audio  ,
  #                    :url => "/assets/:class/:id/:attachment/:style.:extension",
  #                    :path => ":rails_root/public/assets/:class/:id/:attachment/:style.:extension"

  has_attached_file :audio_file
  validates_attachment :audio_file, :content_type => {:content_type => ['audio/mpeg', 'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3', 'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio']},
   :file_name => { :matches => [ /mp3\Z/]}

# def self.full_p
# end
# def self.full_l
# end

end
