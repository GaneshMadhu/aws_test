class CaseStudyLibraryController < ApplicationController

	def index
		iris   = IrisEngine::IrisApi.new
    @posts = iris.search("report_tagged_posts", {"sort"=> {"engagement_score_normalised"=>"desc"}})
	end

	def filter
		filter_data
	end

  def scroll
    filter_data
  end

  private

  def filter_data
    filters = ParseQueryParams.new(params).parse
    iris    = IrisEngine::IrisApi.new
    @posts  = iris.search("report_tagged_posts/filter", filters)
  end
end
