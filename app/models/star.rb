class Star < ApplicationRecord

	def self.toggle(current_user, user)

		if !current_user.id || !user.id
			return nil
		end

		puts "\n\n\n\t\t* DONOR ID:  #{current_user.id}\n\t\t* RECIPIENT ID:  #{user.id}\n\n\n"

		star = Star.find_by(donor_id: current_user.id, recipient_id: user.id)

		if star
			star.delete
		else
			star = Star.create donor_id: current_user.id, recipient_id: user.id
		end

		return !! star
	end

end
