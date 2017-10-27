class JamSession < ApplicationRecord

  geocoded_by :description
  after_validation :geocode

  def host_name(host_id)
    @name= User.where(id:host_id).pluck(:name)
  end

end
