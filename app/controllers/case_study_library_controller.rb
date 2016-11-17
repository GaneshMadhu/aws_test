class CaseStudyLibraryController < ApplicationController

	def index
		iris = IrisEngine::IrisApi.new
    @posts = iris.search("report_tagged_posts", {"sort"=> {"engagement_score_normalised"=>"desc"}})
	end
	def filter
		filter_params = ParseFilterQuery.parse_filters(params)
		sort_params = params[:sort] ? params[:sort] : {"engagement_score_normalised" => "desc"}
    page_number = params[:page_number] ? params[:page_number] : 1
    per_page_count = params[:per_page] ? params[:per_page] : 30
		filters = {:page=> page_number, :per_page=> per_page_count, :filter => filter_params, :sort=>[sort_params], "post"=>{}}
		iris = IrisEngine::IrisApi.new
    @posts = iris.search("report_tagged_posts/filter", filters)["data"]
	end
end
