class UsersController < ApplicationController

  def index
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def edit
    @user = current_user
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to profile_path
    else
      redirect_to profile_edit_path
    end
  end

  def show
      if params[:id]
        @user = User.find(params[:id])
      else
        @user = current_user
      end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Welcome to Follow the Music!"
      redirect_to jam_sessions_path
    else
      render 'new'
    end
  end
private

  def user_params
    params.require(:user).permit(:name, :email, :password,
                                 :password_confirmation, :avatar)
  end
end
