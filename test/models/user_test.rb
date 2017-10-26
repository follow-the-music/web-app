require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
  @user = User.new(name: "Example", email: "example@user.com", password: "password", password_confirmation: "password")
end

  test "email addresses should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end
end
