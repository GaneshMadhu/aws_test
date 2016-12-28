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
      company_precode = response["user"]["company"]["precode"]
      bu = response["user"]["business_units"]
      country_codes = bu.map{|x| x["represented_country"]}
      logo_urls = []
      bu.each do |unit|
        logo_urls << unit["memberships"].map{|x| x["logo"]["url"] }
      end
      [company_precode, country_codes, logo_urls.flatten.compact.uniq]
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
