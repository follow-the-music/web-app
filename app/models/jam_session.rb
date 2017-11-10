class JamSession < ApplicationRecord
  has_many :chat_messages

  geocoded_by :address
  after_validation :geocode

  def host_name(host_id)
    @name= User.where(id:host_id).pluck(:name)
  end

end
