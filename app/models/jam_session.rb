class JamSession < ApplicationRecord
  has_many :chat_messages
  has_many :guest_session_associations
  geocoded_by :address
  after_validation :geocode
  self.per_page = 4
  filterrific(
    available_filters: [
      :search_query
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
    JamSession.where("name LIKE ?", "%#{search_query}%").or(JamSession.where("description LIKE ?", "%#{search_query}%"))
  }
# def self.full_p
# end
# def self.full_l
# end

end
