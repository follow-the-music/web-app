source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.4'
gem 'bootstrap-sass', '3.4.1'
gem 'jquery-rails'
gem 'bcrypt',         '3.1.11'
gem 'bootstrap_form'
gem "paperclip"
gem 'aws-sdk', '~> 2.3'
gem "puma", ">= 3.12.4"
gem 'form_slider'
  gem 'formtastic', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'rails_12factor', group: :production
gem 'rails-controller-testing'
gem "geocoder", ">= 1.6.1"
gem 'gmaps4rails'
gem 'underscore-rails'
gem 'frontend-generators'
gem 'will_paginate', '~> 3.1', '>= 3.1.6'
gem 'bootstrap-will_paginate', '~> 0.0.10'


# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'geetar'
gem 'rails_admin', '~> 1.2'
gem 'pusher'
gem 'nokogiri', '~> 1.10', '>= 1.10.8'
gem 'filterrific'
gem 'dotenv-rails'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
#gem 'redis', '~> 3.0'


group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
  gem "rails-erd"
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'pry-rails'
end

group :production do
  gem 'pg', '~> 0.20.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
