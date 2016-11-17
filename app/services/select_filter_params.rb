class SelectFilterParams
  attr_reader :filter_data, :filter_type, :filter_group

  def initialize(data,filter_type)
    @filter_data   = data
    @filter_type   = filter_type
    @filter_group  = filter_group
  end

  def options
    {
      traits:             filter_data,
      class_name:         ".ugf-#{filter_group}",
      results_containter: ".ugf-#{filter_group}-results",
      dropdown_parent:    ".ugff-#{filter_group}",
      placeholder:        "Search #{filter_group.capitalize}",
      tooltip:            "All Filters",
      filter_title:       filter_group.capitalize,
      filter_group:       filter_group
    }
  end

  private

  def filter_group
    case filter_type
      when "traits"
        return 'attribute'
      when "companies"
        return 'company'
      when "company_groups"
        return 'country'
      when "industries"
        return 'industry'
      when "platforms"
        return 'platform'
    end
  end
end
