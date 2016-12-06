Rails.application.routes.draw do
  resources :homepage do
    get :how_iris_works, on: :collection
  end

  resources :attributes

 	resources :case_study_library do
 		collection do
 			get :filter, as: "filter"
      get :scroll
 		end
 	end

  resources :social_media_performance do
    get :filter, on: :collection
  end

  resources :attribute_zoom_in do
    get :filter, on: :collection
  end

  resources :home

  get 'terms_and_conditions' => 'home#terms_and_conditions'
  get 'privacy_policy' => 'home#privacy_policy'
  get 'faqs' => 'home#faqs'

  root "homepage#index"
end
