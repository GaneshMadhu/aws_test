class CaseStudyLibraryController < ApplicationController

	def index
		iris = IrisEngine::IrisApi.new
    @posts = iris.case_study_search("report_tagged_posts", {"sort"=> {"engagement_score_normalised"=>"desc"}})
    respond_to do |format|
	    format.html
	  end
	end

end
