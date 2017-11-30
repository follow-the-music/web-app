Rails.application.routes.draw do

  resources :chat_messages
  resources :guest_session_associations
  resources :jam_sessions
  resources :users

  get 'sessions/new'

  get 'users/new'
  resources :users
  root 'static_pages#landingpage'
  get 'loginpage', to: 'static_pages#loginpage' # OLD
  # get 'about', to: 'static_pages#about'
  get 'display_map', to: 'application#display_map'  # OLD
  # get '/jam', to: 'application#display_map'
  get  '/choosetype',    to: 'static_pages#choosetype'
  get  '/signup',  to: 'users#new'
  get   '/login',   to: 'sessions#new'
  get '/new_event', to: 'jam_sessions#new'
  get '/jam_session', to: 'jam_sessions#show'
  get 'profile', to: 'users#show'
  get '/profile/edit', to: 'users#edit'
  get '/profile/edit', to: 'users#edit'
post   '/login',   to: 'sessions#create'
get '/logout',  to: 'sessions#destroy'
post '/signup',  to: 'users#create'


end
