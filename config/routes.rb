Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => 'home#index'

  post '/users' => 'users#create'
  post '/login' => 'session#create'
  post '/logout' => 'session#destroy'

  get '/lists/new' => 'home#new'
  post '/lists/create' => 'list#create'

  get '*path', to: 'home#index'

end
