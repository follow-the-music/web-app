Rails.application.routes.draw do
  resources :users
  root 'application#display_map'
  root 'application#user_profile'
end
