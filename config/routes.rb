Rails.application.routes.draw do

  resources :users
  resources :posts
  resources :comments, only: [:index, :destroy]
  resources :likes, only: [:index, :destroy]
  resources :direct_messages, only: [:index]
  resources :followings, only: [:index, :create, :destroy]

  get "/users/:id/posts/:post_id", to: "posts#show"
  # get "/users/:id/posts/:post_id/likes", to: "users#users_who_liked"
  post "/posts/:post_id/comments", to: "comments#create"
  post "/users/:id/posts/:post_id/likes", to: "likes#create"
  post "/users/:id/posts", to: "posts#create"
  post "/users/:id/direct_messages", to: "direct_messages#create"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end