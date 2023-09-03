Rails.application.routes.draw do

  resources :users
  resources :posts
  resources :comments, only: [:index]

  get "/users/:id/posts/:post_id", to: "posts#show"
  get "/users/:id/posts/:post_id/likes", to: "users#users_who_liked"
  post "/signup", to: "users#create"
  # get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end