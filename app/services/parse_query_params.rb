class ParseQueryParams
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def parse
    query = {
      page_number: params[:page_number] ? params[:page_number] : 1,
      per_page_count: params[:per_page] ? params[:per_page] : 30
    }

    filter_query  = {}
    params["filter"].each do |key,value|
      case key
        when 'post_time'
          post_time_query        = {}
          post_time_query["max"] = value["lte"] unless value["lte"].nil?
          post_time_query["min"] = value["gte"] unless value["gte"].nil?
          filter_query[key]      = post_time_query unless post_time_query.blank?
        else
          filter_query[key] = value.join(",") unless value.blank?
      end
    end
    query[:sort] = [{"engagement_score_normalised" => params[:sort]}] unless params[:sort].blank?
    query[:filter] = filter_query

    query
  end
end
