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

  test "password should be present" do
   user = User.new(name: "Example1", email: "example1@user.com")
   assert_not user.valid?
 end

 test "password should be at least 6 characters long" do
   user = User.new(name: "Example2", email: "example2@user.com", password: "p", password_confirmation: "p")
   assert_not user.valid?
 end

 test "passwords and confirmation should match" do
   user = User.new(name: "Example3", email: "example3@user.com", password: "password", password_confirmation: "not_password")
   assert_not user.valid?
 end

end
