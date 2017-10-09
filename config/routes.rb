Rails.application.routes.draw do
  root 'application#choice'
  get 'application/display_map'
  resources :users
  get 'users/index'
  get 'users/new'
  # root 'application#user_profile'
end
