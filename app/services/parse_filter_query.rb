class ParseFilterQuery
  def self.parse_filters(params)
    filter_params = params["filter"]
    filter_query = {}
    if filter_params
      filter_query["trait.code"] = filter_params["traits.code"].join(",") unless filter_params["traits.code"].nil?
      filter_query["company_group_id"] = filter_params["company_group_name"].join(",") unless filter_params["company_group_name"].nil?
      filter_query["company_precode"] = filter_params["company_precode"].join(",") unless filter_params["company_precode"].nil?
      filter_query["platforms"] = filter_params["platforms"].join(",") unless filter_params["platforms"].nil?
      filter_query["industry_type"] = filter_params["industry_type"].join(",") unless filter_params["industry_type"].nil?
      filter_query["post_type"] = filter_params["post_type"].join(",") unless filter_params["post_type"].nil?
      post_time_query = {}
      if filter_params["post_time"]
        post_time_query["max"] = filter_params["post_time"]["lte"] unless filter_params["post_time"]["lte"].nil?
        post_time_query["min"] = filter_params["post_time"]["gte"] unless filter_params["post_time"]["gte"].nil?
      end
      filter_query["post_time"] = post_time_query
    end

    filter_query
  end
end
