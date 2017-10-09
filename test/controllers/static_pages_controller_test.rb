require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get static_pages_login_url
    assert_response :success
  end

  test "should get choosetype" do
    get static_pages_choosetype_url
    assert_response :success
  end

end
