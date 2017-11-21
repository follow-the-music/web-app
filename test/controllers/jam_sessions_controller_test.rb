require 'test_helper'

class JamSessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @jam_session = jam_sessions(:one)
  end
  
  test "should get index" do
    get jam_sessions_url
    assert_response :success
  end

  test "should get new" do
    get new_jam_session_url
    assert_response :success
  end

  test "should create jam_session" do
    assert_difference('JamSession.count') do
      post jam_sessions_url, params: { jam_session: { description: @jam_session.description, host_id: @jam_session.host_id, latitude: @jam_session.latitude, longitude: @jam_session.longitude, max_listeners: @jam_session.max_listeners, max_players: @jam_session.max_players, name: @jam_session.name } }
    end

    assert_redirected_to jam_session_url(JamSession.last)
  end

  test "should show jam_session" do
    get jam_session_url(@jam_session)
    assert_response :success
  end

  test "should get edit" do
    get edit_jam_session_url(@jam_session)
    assert_response :success
  end

  test "should update jam_session" do
    patch jam_session_url(@jam_session), params: { jam_session: { description: @jam_session.description, host_id: @jam_session.host_id, latitude: @jam_session.latitude, longitude: @jam_session.longitude, max_listeners: @jam_session.max_listeners, max_players: @jam_session.max_players, name: @jam_session.name } }
    assert_redirected_to jam_session_url(@jam_session)
  end
end
