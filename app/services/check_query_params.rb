class CheckQueryParams
  attr_reader :params, :selected

  def initialize(params)
    @params   = params
    @selected = {}
  end

  def append
    filter_params = params['filter'] ||= {}
    params.each do |key,value|
      case key
        when 'attribute'
          selected['traits'] = filter_params['trait.code'] = value.split(',')
        when 'platform'
          selected['platforms'] = filter_params['url_type'] = value.split(',')
        when 'company'
          selected['companies'] = filter_params['company_precode'] = value.split(',')
        when 'country'
          selected['company_groups'] = filter_params['company_group_id'] = value.split(',')
        when 'industry'
          selected['industries'] = filter_params['industry'] = value.split(',')      end
    end if params
    [filter_params,selected]
  end
end
