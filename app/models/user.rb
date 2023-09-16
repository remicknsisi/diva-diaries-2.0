class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :name, presence: true

    has_many :posts
    has_many :likes
    has_many :comments
    has_many :direct_messages
    has_many :followings

    def followers
        allFollowings = Following.all
        followers = allFollowings.where('followed_user_id = ?', self.id)
    end
end