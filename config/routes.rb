Rails.application.routes.draw do
  resources :dashboard do
    get :how_iris_works, on: :collection
  end
  resources :attributes
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/case_study_library" => "case_study_library#index", as: "case_study_library"
  get "/social_media_performance" => "social_media_performance#index", as: "social_media_performance"
  get "/post_metrics" => "post_metrics#index", as: "post_metrics"

  root "dashboard#index"
end
