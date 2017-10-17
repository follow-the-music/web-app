Rails.application.routes.draw do

  resources :guest_session_associations
  resources :jam_sessions
  get 'sessions/new'

  get 'users/new'
  resources :users
  root 'static_pages#login'
  get '/display_map', to: 'application#display_map'
  get   '/choice', to:'static_pages#choice'
  get  '/choosetype',    to: 'static_pages#choosetype'
  get  '/signup',  to: 'users#new'
  get   '/login',   to: 'sessions#new'
post   '/login',   to: 'sessions#create'
delete '/logout',  to: 'sessions#destroy'
post '/signup',  to: 'users#create'
 resources :users


end
