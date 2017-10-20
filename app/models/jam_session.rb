class JamSession < ApplicationRecord

  def host_name(host_id)
    @name= User.where(id:host_id).pluck(:name)
  end
  
end
