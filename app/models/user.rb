class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :name, presence: true

    has_many :posts
    has_many :likes
    has_many :comments
    has_many :direct_messages
    has_many :followings

    def unique_followers
        allFollowings = Following.all
        followers = allFollowings.where('followed_user_id = ?', self.id)
        duplicate_ids = {}
        unique_followers = followers.select do |follower|
            if duplicate_ids[follower.user_id]
                false
            else
                duplicate_ids[follower.user_id] = true
            end
        end
    end

    def unique_followings
        followings = self.followings
        duplicate_ids = {}
        unique_followings = followings.select do |following|
            if duplicate_ids[following.followed_user_id]
                false
            else
                duplicate_ids[following.followed_user_id] = true
                true
            end
        end
    end

    def received_messages
        messages = DirectMessage.all
        received_messages = messages.where('recipient_id = ?', self.id)
    end

end