Rails.application.routes.draw do

  get 'sessions/new'

  get 'users/new'
  resources :users
  ##get '/displaymap' to: 'application#display_map'
  root 'static_pages#login'
  get   '/choice', to:'static_pages#choice'
  get  '/choosetype',    to: 'static_pages#choosetype'
  get  '/signup',  to: 'users#new'
  get   '/login',   to: 'sessions#new'
post   '/login',   to: 'sessions#create'
delete '/logout',  to: 'sessions#destroy'
post '/signup',  to: 'users#create'
 resources :users


end
