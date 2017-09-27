Rails.application.routes.draw do
  resources :users
  root 'application#display_map'
end
