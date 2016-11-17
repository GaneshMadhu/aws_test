class SocialMediaPerformanceController < ApplicationController
  def index
    iris   = IrisEngine::IrisApi.new
    @tagging_metrics = iris.search("tagging_metrics", {})
  end
end
