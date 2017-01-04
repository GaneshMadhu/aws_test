class HomeController < ApplicationController

	def terms_and_conditions
	end

	def privacy_policy
	end

	def faqs
    @faqs = IrisEngine::IrisApi.new.search("faqs",{})
	end

	def clear_session
		clear_iris_session
		redirect_to main_app.logout_user_sessions_path
	end

end
