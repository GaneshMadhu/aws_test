class User < ApplicationRecord
	after_create :add_bp_id

	protected
	def add_bp_id
 		bp_user = UniversumBpModels::Api::User.where(email: self.email).first
    self.update_attributes bp_id: bp_user.id
	end
end
