Rails.application.routes.draw do
  resources :dashboard do
    get :how_iris_works, on: :collection
  end

  resources :attributes
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 	resources :case_study_library do
 		collection do
 			get :filter, as: "filter"
      get :scroll
 		end
 	end

  resources :social_media_performance

  resources :post_metrics

  root "dashboard#index"
end
