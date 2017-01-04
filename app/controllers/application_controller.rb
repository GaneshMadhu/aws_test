class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
	before_action :authenticate_user!

  private

  def check_query_params
    filter_params     = CheckQueryParams.new(params,session).append
    params['filter']  = filter_params[0]
    @selected_options = filter_params[1]
  end

  def clear_iris_session
    session[:company_precode] = nil
    session[:country_codes] = nil
    session[:logo_urls] = nil
  end

  protected

  def authenticate_user!
    if current_user && UniversumSsoClient.signed_out?(current_user.uid)
      clear_iris_session
      redirect_to main_app.logout_user_sessions_path
    end
    ensure_last_signed_in_at_set
    sign_out_expired_session
    set_company_params
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
        user_company = bp_api.bu_details("get_company_detail/#{current_user.uid.to_i}")
        parse_results = bp_api.parse_results(user_company)
        session[:company_precode] = parse_results[0]
        session[:country_codes]   = parse_results[1]
        session[:logo_urls]       = parse_results[2]
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
      @current_user = nil
      clear_iris_session
    end
  end

end
