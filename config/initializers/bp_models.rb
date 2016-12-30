UniversumBpModels.configure do |config|
  config.local_bp = false
end unless Rails.env.development?

::Her::API.setup url: UniversumBpModels.api_url
