class JamSession < ApplicationRecord
  has_many :chat_messages

  geocoded_by :address
  after_validation :geocode

  def host_name(host_id)
    @name= User.where(id:host_id).pluck(:name)
  end


  has_attached_file :audio
  validates :audio, presence: true
  validates_attachment_content_type :audio, :content_type => [ 'audio/mpeg', 'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3', 'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio' ]


end
