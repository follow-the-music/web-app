Rails.application.routes.draw do

  resources :guest_session_associations
  resources :jam_sessions
  resources :users

  get 'sessions/new'

  get 'users/new'

  root 'static_pages#login'
  get '/display_map', to: 'application#display_map'
  get   '/choice', to:'static_pages#choice'
  get  '/choosetype',    to: 'static_pages#choosetype'
  get  '/signup',  to: 'users#new'
  get   '/login',   to: 'sessions#new'
  get '/new_event', to: 'jam_sessions#new'
  #get '/:id', to: 'users#show'
  get 'profile', to: 'users#show'

post   '/login',   to: 'sessions#create'
delete '/logout',  to: 'sessions#destroy'
post '/signup',  to: 'users#create'


end
