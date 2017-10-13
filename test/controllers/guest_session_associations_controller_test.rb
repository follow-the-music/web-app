require 'test_helper'

class GuestSessionAssociationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @guest_session_association = guest_session_associations(:one)
  end

  test "should get index" do
    get guest_session_associations_url
    assert_response :success
  end

  test "should get new" do
    get new_guest_session_association_url
    assert_response :success
  end

  test "should create guest_session_association" do
    assert_difference('GuestSessionAssociation.count') do
      post guest_session_associations_url, params: { guest_session_association: { player: @guest_session_association.player, session_id: @guest_session_association.session_id, user_id: @guest_session_association.user_id } }
    end

    assert_redirected_to guest_session_association_url(GuestSessionAssociation.last)
  end

  test "should show guest_session_association" do
    get guest_session_association_url(@guest_session_association)
    assert_response :success
  end

  test "should get edit" do
    get edit_guest_session_association_url(@guest_session_association)
    assert_response :success
  end

  test "should update guest_session_association" do
    patch guest_session_association_url(@guest_session_association), params: { guest_session_association: { player: @guest_session_association.player, session_id: @guest_session_association.session_id, user_id: @guest_session_association.user_id } }
    assert_redirected_to guest_session_association_url(@guest_session_association)
  end

  test "should destroy guest_session_association" do
    assert_difference('GuestSessionAssociation.count', -1) do
      delete guest_session_association_url(@guest_session_association)
    end

    assert_redirected_to guest_session_associations_url
  end
end
