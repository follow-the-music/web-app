module ApplicationHelper

	def declare_failed_attempt_to(action)
		if action == :signup || action == :login
			session[:failed_attempt] = action
		end
	end

	def clear_failed_attempt
		session[:failed_attempt] = nil
	end

	def get_failed_attempt
		session[:failed_attempt]
	end

end
