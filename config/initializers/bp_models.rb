UniversumBpModels.configure do |config|
  config.local_bp = false
end if (Rails.env.production? || Rails.env.staging?)

::Her::API.setup url: UniversumBpModels.api_url
