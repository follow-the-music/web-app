# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171208181529) do

  create_table "chat_messages", force: :cascade do |t|
    t.text "content"
    t.integer "author_id"
    t.integer "jam_session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "guest_session_associations", force: :cascade do |t|
    t.integer "user_id"
    t.integer "jam_session_id"
    t.boolean "player"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hearts", force: :cascade do |t|
    t.integer "user_id"
    t.integer "jam_session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jam_sessions", force: :cascade do |t|
    t.integer "host_id"
    t.integer "max_players"
    t.integer "max_listeners"
    t.text "name"
    t.text "description"
    t.float "longitude"
    t.float "latitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "address"
    t.binary "audio"
    t.string "audio_file_file_name"
    t.string "audio_file_content_type"
    t.integer "audio_file_file_size"
    t.datetime "audio_file_updated_at"
    t.string "genre"
    t.datetime "start_time"
    t.datetime "end_time"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.text "user_name"
    t.text "biography"
    t.float "rating"
    t.float "longitude"
    t.float "latitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
