class CheckQueryParams
  attr_reader :params, :selected

  def initialize(params)
    @params   = params
    @selected = {}
  end

  def append
    filter_params = params['filter'] ||= {}
    params['filter_query'].each do |key,value|
      case key
        when 'trait.code'
          selected['traits'] = filter_params['trait.code'] = value.split('$')
        when 'url_type'
          selected['platforms'] = filter_params['url_type'] = value.split('$')
        when 'company_precode'
          selected['companies'] = filter_params['company_precode'] = value.split('$')
        when 'company_group_id'
          selected['company_groups'] = filter_params['company_group_id'] = value.split('$')
        when 'industry'
          selected['industries'] = filter_params['industry'] = value.split('$')
        when 'sponsored_or_organic'
          selected['sponsored_or_organic'] = filter_params['sponsored_or_organic'] = value.split('$')
        when 'post_time'
          filter_params['post_time'] = {}
          selected['post_time']      = {}
          if value['min']
            filter_params['post_time']['gte'] = value['min']
            selected['post_time']['min']      = value['min']
          end
          if value['max']
            filter_params['post_time']['lte'] = value['max']
            selected['post_time']['max']      = value['max']
          end
      end
    end if params['filter_query']
    [filter_params,selected]
  end
end
