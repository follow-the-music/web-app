class JamSession < ApplicationRecord
  has_many :chat_messages
  has_many :guest_session_associations
  geocoded_by :address
  after_validation :geocode
  self.per_page = 4
  filterrific(
    available_filters: [
      :search_query_address,
      :search_query_jam_name,
      :search_query_host_name,
      :select_genre
    ]
  )
  def host_name(host_id)
    @name= User.where(id:host_id).pluck(:name)
  end
  def self.count_p
    GuestSessionAssociation.where(jam_session_id:self.id, player:TRUE).count
  end
  def self.count_l
    GuestSessionAssociation.where(jam_session_id:self.id, player:FALSE).count
  end
  scope :search_query, lambda { |search_query|
    return nil if search_query.blank?
    # where("name LIKE ? OR descripton LIKE ?", search_query, search_query)
    JamSession.where("name LIKE ?", "%#{search_query}%").or(JamSession.where("description LIKE ?", "%#{search_query}%")).or(JamSession.where("address LIKE ?", "%#{search_query}%"))
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
