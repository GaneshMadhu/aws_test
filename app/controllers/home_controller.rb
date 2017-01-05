class HomeController < ApplicationController

	def terms_and_conditions
	end

	def privacy_policy
	end

	def faqs
    @faqs = IrisEngine::IrisApi.new.search("faqs",{})
	end

	def clear_session
		clear_iris_and_sign_out
	end

end
