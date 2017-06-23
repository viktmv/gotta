Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => 'home#index'

  post '/users' => 'users#create'
  post '/login' => 'session#create'
  post '/logout' => 'session#destroy'
  post '/connect' => 'list#connect'

  post '/lists/:id/sms' => 'list#text_message'

  get '/lists/new' => 'home#new'
  get '/lists/:id' => 'list#show'
  get '/lists/:id/edit' => 'list#edit'
  delete '/lists/:id/delete' => 'list#delete'

  get '/lists/all/:id' => 'list#get_user_lists'
  post '/lists/create' => 'list#create'


  get '*path', to: 'home#index'

end
