module IrisEngine

  class IrisApi

    ENDPOINT = "http://localhost:3000/api"

    attr_accessor :conn

    def initialize
      @conn = Faraday.new url: ENDPOINT
      # @conn.basic_auth "iris_api", "ff3c3ac002c6c8cb"
    end

    def search
      json = _wrap_json do
        @conn.get do |r|
          r.url "report_tagged_posts"
          r.headers['Content-Type'] = 'application/json'
          r.headers['Accept'] = 'application/api.v1'
          r.body
        end
      end
    end

  private

   def _wrap_json(&block)
      if block_given?
        resp = block.call
        raise "Attribot API Error: #{resp.status}" unless _response_good?(resp)
        JSON.parse resp.body
      end
    end

    def _response_good?(resp)
      return false unless resp.status.between? 200, 299
      true
    end
  end
end
