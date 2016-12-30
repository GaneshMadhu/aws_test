UniversumBpModels.configure do |config|
  config.local_bp = false
end

::Her::API.setup url: UniversumBpModels.api_url
