class ParseQueryParams
  attr_reader :params, :sort

  def initialize(params,sort=false)
    @params = params
    @sort   = sort
  end

  def parse
    query = {
      page: params[:page] ? params[:page] : 1,
      per_page: params[:per_page] ? params[:per_page] : 30
    }

    filter_query  = {}
    if params[:filter]
      params["filter"].each do |key,value|
        case key
          when 'post_time'
            post_time_query        = {}
            post_time_query["max"] = value["lte"] unless value["lte"].nil?
            post_time_query["min"] = value["gte"] unless value["gte"].nil?
            filter_query[key]      = post_time_query unless post_time_query.blank?
          else
            filter_query[key] = value.join("$") unless value.blank?
        end
      end
    end
    query[:filter] = filter_query

    if sort
      sort_params  = params[:sort].blank? ? "desc" : params[:sort]
      query[:sort] = [{"engagement_score_normalised" => sort_params}]
    end

    query
  end
end
