module BusinessProfile

  class BpApi

    attr_accessor :conn

    def initialize
      @conn = Faraday.new url: ENV["BP_ENDPOINT"]
    end

    def company_details(url)
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
