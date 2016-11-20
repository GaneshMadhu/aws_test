class SocialMediaPerformanceController < ApplicationController
  def index
    iris             = IrisEngine::IrisApi.new
    @tagging_metrics = iris.search("tagging_metrics", {})
  end

  def filter
    filters           = ParseQueryParams.new(params).parse
    iris              = IrisEngine::IrisApi.new
    @tagging_metrics  = iris.search("tagging_metrics/filter", filters)
  end
end
