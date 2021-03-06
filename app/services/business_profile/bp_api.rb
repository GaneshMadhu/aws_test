module BusinessProfile

  class BpApi

    attr_accessor :conn

    def initialize
      @conn = Faraday.new url: ENV["BP_ENDPOINT"]
    end

    def bu_details(url)
      response = @conn.get url
      json = _wrap_json do
        @conn.get do |r|
          r.url url
          r.headers['Content-Type'] = 'application/json'
          r.headers = {'Accept' => 'application/api.v1', 'Authorization' => %-Token token="#{ENV["BP_TOKEN"]}"-}
        end
      end
      json
    end

    def parse_results(response)
      user_object = response["user"] rescue nil
      if user_object.present?
        if user_object["company"]
          company_precode = user_object["company"]["precode"]
          company_logo = user_object["company"]["logo"] ? user_object["company"]["logo"]["url"] : nil
        end
        bu = user_object["business_units"] ? user_object["business_units"] : nil
        country_codes = bu.map{|x| x["represented_country"]} if bu
        logo_urls = []
        bu.each do |unit|
          logo_urls << unit["memberships"].map{|x| x["logo"]["url"] } if unit["memberships"]
        end if bu
        [company_precode, company_logo, country_codes, logo_urls.flatten.compact.uniq]
      else
        [nil, nil, nil, []]
      end
    end

    def find_products(response)
      response["products"].map{|x| x["name"]} if (response && response["products"])
    end

  private

   def _wrap_json(&block)
      if block_given?
        resp = block.call
        unless _response_good?(resp)
          {"data" => "#{resp.status} - #{resp.body}"}
        else
          JSON.parse resp.body
        end
      end
    end

    def _response_good?(resp)
      return false unless resp.status.between? 200, 299
      true
    end
  end
end
