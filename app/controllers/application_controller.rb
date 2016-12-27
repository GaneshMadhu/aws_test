class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
	before_action :authenticate_user!

  private

  def check_query_params
    filter_params     = CheckQueryParams.new(params,session).append
    params['filter']  = filter_params[0]
    @selected_options = filter_params[1]
  end

  protected

  def authenticate_user!
    ensure_last_signed_in_at_set
    set_company_params
    sign_out_expired_session
    if !current_user
      respond_to do |format|
        format.json {
          render json: {errors: ['Access Denied']}, status: :unauthorized
        }
        format.any {
          redirect_to '/auth/universumaccess'
        }
      end
    end
  end

  def current_user
    return nil unless session[:user_id] || @current_user
    @current_user ||= User.find_by_uid(session[:user_id]['uid'])
  end

  # Some users may not have this set yet
  def ensure_last_signed_in_at_set
    return unless current_user.present?
    return if current_user.last_signed_in_at.present?
    current_user.update last_signed_in_at: current_user.updated_at
  end

  def set_company_params
    if current_user
      if session[:company_precode].nil? || session[:country_codes].nil?
        bp_api = BusinessProfile::BpApi.new
        user_permissions = bp_api.bu_details("users/#{current_user.bp_id}/permissions")
        business_units = bp_api.parse_results(user_permissions)
        precodes = []
        company_groups = []
        gems = []
        business_units.each do |bu|
          business_details = bp_api.bu_details("business_units/#{bu}")
          gems << bp_api.parse_bu_details(business_details)[0]
          company_groups << bp_api.parse_bu_details(business_details)[1]
        end
        company_precode = bp_api.bu_details("users/#{current_user.bp_id}/company")["company"]["precode"]
        session[:logo_urls] = gems.flatten.flatten
        session[:country_codes] = company_groups.flatten.compact
        session[:company_precode] = company_precode
      end
    end
  end

  # Sign out users that expired, but check each 5min or so
  def sign_out_expired_session
    return unless current_user.present?
    return if current_user.last_sign_in_check.present? && current_user.last_sign_in_check <= 5.minutes.ago

    current_user.update last_sign_in_check: Time.now

    if UniversumSsoClient.signed_out?(current_user.uid)
      session[:user_id] = nil
      session[:company_precode] = nil
      session[:country_codes] = nil
      @current_user = nil
    end
  end

end
