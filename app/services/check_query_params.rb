class CheckQueryParams
  attr_reader :params, :selected

  def initialize(params)
    @params   = params
    @selected = {}
  end

  def append
    append_default_params
    filter_params = params['filter'] ||= {}
    params['filter_query'].each do |key,value|
      case key
        when 'trait.code'
          selected['traits'] = filter_params['trait.code'] = value.split('$') if value
        when 'url_type'
          selected['platforms'] = filter_params['url_type'] = value.split('$') if value
        when 'company_precode'
          selected['companies'] = filter_params['company_precode'] = value.split('$') if value
        when 'company_group_id'
          selected['company_groups'] = filter_params['company_group_id'] = value.split('$') if value
        when 'country_codes'
          selected['country_codes'] = filter_params['country_codes'] = value.split('$') if value
        when 'industry'
          selected['industries'] = filter_params['industry'] = value.split('$') if value
        when 'sponsored_or_organic'
          selected['sponsored_or_organic'] = filter_params['sponsored_or_organic'] = value.split('$') if value
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

  private

  def append_default_params
    params['filter_query'] ||= {}
    case params['controller']
      when 'attribute_zoom_in'
        params['filter_query']['trait.code'] = ENV['ZOOMIN_DEFAULT_TRAIT'] if params['filter_query']['trait.code'].blank?
        params['filter_query']['post_time']  = {'max': Date.today.strftime("%m/%d/%y"), 'min': (Date.today - 1.years).strftime("%m/%d/%y")} if params['filter_query']['post_time'].blank?
      when 'social_media_performance'
        params["filter_query"]["company_precode"] = [params[:precode]]
        params["filter_query"]["country_codes"] = [params[:country_codes].split('$')]
    end
  end
end
