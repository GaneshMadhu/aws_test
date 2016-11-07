Rails.application.routes.draw do
  resources :dashboard
  resources :attributes
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/case_study_library" => "case_study_library#index", as: "case_study_library"
end
