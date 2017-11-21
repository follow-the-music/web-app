require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
  end

  test "name should be present" do
    user = User.new(email: "example@user.com", password: "password", password_confirmation: "password")
    assert_not user.valid?
  end

  test "email should be present" do
    user = User.new(name: "Example", password: "password", password_confirmation: "password")
    assert_not user.valid?
  end

  # test "email should be formated correctly" do
  #   user = User.new(name: "Example", email: "example@user.com", password: "password", password_confirmation: "password")
  #   assert_not user.valid?
  # end

  test "email addresses should be unique" do
    user = User.new(name: "Example", email: "example@user.com", password: "password", password_confirmation: "password")
    duplicate_user = user.dup
    duplicate_user.email = user.email.upcase
    user.save
    assert_not duplicate_user.valid?
  end

  test "password should be present" do
   user = User.new(name: "Example", email: "example@user.com")
   assert_not user.valid?
  end

  test "password should be at least 6 characters long" do
   user = User.new(name: "Example", email: "example@user.com", password: "p", password_confirmation: "p")
   assert_not user.valid?
  end

  test "passwords and confirmation should match" do
   user = User.new(name: "Example", email: "example@user.com", password: "password", password_confirmation: "not_password")
   assert_not user.valid?
  end

  test "valid password should be accepted" do
    user = User.new(name: "Example", email: "example@user.com", password: "password", password_confirmation: "password")
    assert user.valid?
  end

end
