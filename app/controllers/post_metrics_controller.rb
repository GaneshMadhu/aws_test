class PostMetricsController < ApplicationController
  def index
    iris   = IrisEngine::IrisApi.new
    @post_metrics = iris.case_study_search("post_metrics", {})
  end
end
