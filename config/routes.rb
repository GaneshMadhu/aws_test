Rails.application.routes.draw do
  resources :dashboard
  resources :attributes
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 	resources :case_study_library do
 		get :index, as: "case_study_library"
 		collection do
 			get :filter, as: "filter"
 		end
 	end
end
