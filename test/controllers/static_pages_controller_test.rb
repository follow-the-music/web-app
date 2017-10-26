require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get loginpage_url
    assert_response :success
  end

  test "should get choosetype" do
    get choice_url
    assert_response :success
  end

end
