Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => 'home#index'

  post '/users' => 'users#create'
  post '/login' => 'session#create'
  post '/logout' => 'session#destroy'
  post '/connect' => 'list#connect'

  get '/lists/new' => 'home#new'
  get '/lists/:id' => 'list#show'

  get '/lists/all/:id' => 'list#user_lists'

  post '/lists/create' => 'list#create'


  get '*path', to: 'home#index'

end
