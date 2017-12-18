Rails.application.routes.draw do

  resources :chat_messages
  resources :guest_session_associations
  resources :jam_sessions
  resources :users

  get 'sessions/new'

  get 'users/new'
  resources :users
  root 'creatives#index'
  get 'loginpage', to: 'static_pages#loginpage' # OLD
  get 'display_map', to: 'application#display_map'  # OLD
  get  '/choosetype',    to: 'static_pages#choosetype'
  get  '/signup',  to: 'users#new'
  get   '/login',   to: 'sessions#new'
  get '/new_event', to: 'jam_sessions#new'
  get '/jam_session', to: 'jam_sessions#show'
  get 'profile', to: 'users#show'
  get '/profile/edit', to: 'users#edit'
  get '/profile/edit', to: 'users#edit'
post   '/login',   to: 'sessions#create'
get 'creatives/index'
get '/logout',  to: 'sessions#destroy'
post '/signup',  to: 'users#create'
get 'tab_show', to: 'jam_sessions#tab_show'
get 'tabs_index', to: 'jam_sessions#tabs_index'
get '/tab_show_chords', to: 'jam_sessions#tab_show_chords'
delete '/guest_session_association', to: 'guest_session_associations#destroy'
end
