class JamSession < ApplicationRecord

  reverse_geocoded_by :latitude, :longitude,
  :address => :location
  after_validation :reverse_geocode

  def host_name(host_id)
    @name= User.where(id:host_id).pluck(:name)
  end

end
