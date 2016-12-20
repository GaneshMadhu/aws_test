class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def check_query_params
    filter_params     = CheckQueryParams.new(params).append
    params['filter']  = filter_params[0]
    @selected_options = filter_params[1]
  end
end
