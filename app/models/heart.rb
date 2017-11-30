class Heart < ApplicationRecord

	def self.toggle(user, jam_session)

		if !user.id || !jam_session.id
			return nil
		end

		heart = Heart.find_by(user_id: user.id, jam_session_id: jam_session.id)

		if heart
			heart.delete
		else
			heart = Heart.create user_id: user.id, jam_session_id: jam_session.id
		end

		return !! heart
	end
end
