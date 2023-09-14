class DirectMessageSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :recipient_id, :content, :created_at
  
    belongs_to :user
end