class SelectFilterParams
  include Rails.application.routes.url_helpers
  attr_reader :filter_data, :filter_type, :filter_group, :api_path, :selected_options

  def initialize(data,filter_type,api_path,selected_options = {})
    @filter_data      = data
    @filter_type      = filter_type
    @filter_group     = filter_group
    @api_path         = api_path
    @selected_options = selected_options || {}
  end

  def options
    {
      traits:             filter_data,
      class_name:         ".ugf-#{filter_group[0]}",
      results_containter: ".ugf-#{filter_group[0]}-results",
      dropdown_parent:    ".ugff-#{filter_group[0]}",
      placeholder:        "Search #{filter_group[1].capitalize}",
      tooltip:            filters[filter_group[0].to_sym],
      filter_title:       filter_group[1],
      filter_group:       filter_group[0],
      rest_url:           api_path,
      selected:           selected_options[filter_type],
      is_multiple:        filters[:is_multiple]
    }
  end

  private

  def filter_group
    case filter_type
      when "traits"
        return ['attribute','Attribute']
      when "companies"
        return ['company','Employer']
      when "company_groups"
        return ['country','Country']
      when "industries"
        return ['industry','Industry']
      when "platforms"
        return ['platform', 'Platform']
    end
  end

  def filters
    case api_path
      when filter_case_study_library_index_path
        {
          attribute: "Search from the list of 40 attributes of employer attractiveness",
          country:   "Search from the list of countries available",
          company:   "Search from the list of employers available",
          platform:  "Search from the list of social media platforms available",
          industry:  "Search from the list of industries available",
          is_multiple: true
        }
      when filter_social_media_performance_index_path
        {
          attribute: "Search from the list of 40 attributes of employer attractiveness",
          country:   "The country/countries of your subscription",
          company:   "Search from the list of employers within your subscription",
          platform:  "Search from the list of social media platforms within your subscription",
          industry:  "Search from the list of industries within your subscription",
          is_multiple: true
        }
      when filter_attribute_zoom_in_index_path
        {
          attribute: "Search from the list of 40 attributes of employer attractiveness",
          country:   "Search from the list of countries available",
          company:   "Search from the list of employers available",
          platform:  "Search from the list of social media platforms available",
          industry:  "Search from the list of industries available",
          is_multiple: (filter_type && (filter_type.eql? 'traits')) ? false : true
        }
      else
        {
          attribute: "Search from the list of 40 attributes of employer attractiveness",
          country:   "Search from the list of countries available",
          company:   "Search from the list of employers available",
          platform:  "Search from the list of social media platforms available",
          industry:  "Search from the list of industries available",
          is_multiple: true
        }
    end
  end
end
