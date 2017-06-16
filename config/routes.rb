Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => 'home#index'

  post '/users' => 'users#create'
  get '/lists/new' => 'home#new'
  get '*path', to: 'home#index'


end
