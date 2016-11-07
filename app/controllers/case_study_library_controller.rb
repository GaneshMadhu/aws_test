class CaseStudyLibraryController < ApplicationController

	def index
		iris = IrisEngine::IrisApi.new
    @posts = iris.search
    
    respond_to do |format|
	    format.html
	  end
	end

end
