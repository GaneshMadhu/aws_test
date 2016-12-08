class SocialMediaPerformanceController < ApplicationController

  before_action :set_company_and_country, only: [:index]
  before_action :set_company_filter

  def index
    filters          = ParseQueryParams.new(params).parse
    iris             = IrisEngine::IrisApi.new
    @tagging_metrics = iris.search("tagging_metrics", filters)
  end

  def filter
    filters           = ParseQueryParams.new(params).parse
    iris              = IrisEngine::IrisApi.new
    @tagging_metrics  = iris.search("tagging_metrics/filter", filters)
  end

  private

  def set_company_and_country
    session['company_name'] = params['company_name']
    session['country'] = params['country']
  end

  def set_company_filter
    if session['company_name']
      if params['filter'].blank?
        params['filter'] = {'company_name': [session['company_name']], 'company_group_name': [session['country']]}
      else
        params['filter']['company_name'] = [session['company_name']] if params['filter']['company_precode'].blank?
        params['filter']['company_group_name'] = [session['country']] if params['filter']['company_group_id'].blank?
      end
    end
  end
end
