require 'test_helper'

class JamSessionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  #
  test "Session should have host" do
    jam_session = Jam_Session.new(host: "1", max_players: 2, max_listeners: 3)
    assert_not jam_session.valid?
  end

  test "Session should have max players" do
    jam_session = Jam_Session.new(host: "1", max_players: 2, max_listeners: 3)
    assert_not jam_session.valid?
  end

  test "Session should have max listeners" do
    jam_session = Jam_Session.new(host: "1", max_players: 2, max_listeners: 3)
    assert_not jam_session.valid?
  end

end
