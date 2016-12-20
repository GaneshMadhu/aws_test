class CaseStudyLibraryController < ApplicationController

  before_action :check_query_params, only: :index
  before_action :add_sort_param, only: :index

	def index
		filter_data "report_tagged_posts"
	end

	def filter
		filter_data "report_tagged_posts/filter"
	end

	def scroll
		filter_data "report_tagged_posts/filter"
	end

	private

  def filter_data url
    filters = ParseQueryParams.new(params,true).parse
    iris    = IrisEngine::IrisApi.new
    @posts  = iris.search(url, filters)
  end

  def add_sort_param
    params['sort'] = "desc"
  end
end
