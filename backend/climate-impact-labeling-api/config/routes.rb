Rails.application.routes.draw do
  resources :food_nutrients
  resources :nutrients
  resources :food_emissions
  resources :emissions
  resources :foods
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
