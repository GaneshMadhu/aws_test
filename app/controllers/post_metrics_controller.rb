class PostMetricsController < ApplicationController
  def index
    iris   = IrisEngine::IrisApi.new
    @post_metrics = iris.search("post_metrics", {})
  end

  def filter
  end
end
