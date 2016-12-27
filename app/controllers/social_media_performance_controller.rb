class SocialMediaPerformanceController < ApplicationController

  # before_action :set_company_and_country, only: [:index]
  # before_action :set_company_filter
  before_action :check_query_params, only: :index

  def index
    filter_data "tagging_metrics"
  end

  def filter
    filter_data "tagging_metrics/filter"
  end

  private

  def filter_data url
    filters           = ParseQueryParams.new(params).parse
    iris              = IrisEngine::IrisApi.new
    @tagging_metrics  = iris.search(url, filters)
  end

  # private

  # def set_company_and_country
  #   session['company_name']       = params['company_name'] if params['company_name']
  #   session['company_group_name'] = params['company_group_name'] if params['company_group_name']
  # end

  # def set_company_filter
  #   if session['company_name']
  #     if params['filter'].blank?
  #       params['filter'] = {'company_name': session['company_name'].split('$'), 'company_group_name': session['company_group_name'].split('$')}
  #     else
  #       params['filter']['company_name'] = session['company_name'].split('$') if params['filter']['company_precode'].blank?
  #       params['filter']['company_group_name'] = session['company_group_name'].split('$') if params['filter']['company_group_id'].blank?
  #     end
  #   end
  # end
end
