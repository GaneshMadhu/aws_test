class SocialMediaPerformanceController < ApplicationController
  def index
    iris   = IrisEngine::IrisApi.new
    @tagging_metrics = iris.case_study_search("tagging_metrics", {})
  end
end
