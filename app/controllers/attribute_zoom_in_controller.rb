class AttributeZoomInController < ApplicationController

  before_action :check_query_params, only: :index
  skip_before_action :ensure_iris_customer!, except: :index

  def index
    filter_data "post_metrics"
  end

  def filter
    filter_data "post_metrics/filter"
  end

  private

  def filter_data url
    filters        = ParseQueryParams.new(params).parse
    iris           = IrisEngine::IrisApi.new
    @post_metrics  = iris.search(url, filters)
  end
end
