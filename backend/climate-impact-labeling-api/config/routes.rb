Rails.application.routes.draw do
  resources :food_nutrients
  resources :nutrients
  resources :food_emissions
  resources :emissions
  resources :foods

  get 'foods/barcode/:id', to: 'foods#barcode_show'
  get 'foods/search/:name', to: 'foods#search'
end
