class Star < ApplicationRecord

	def self.toggle(donor, recipient)

		if !donor.id || !recipient.id
			return nil
		end

		star = Star.find_by(donor_id: donor.id, recipient_id: recipient.id)

		if star
			star.delete
		else
			star = Star.create donor_id: donor.id, recipient_id: recipient.id
		end

		return !! star
	end

end
