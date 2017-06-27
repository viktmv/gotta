class UsersController < ApplicationController
  def new
  end


  def create
    @user = User.new(user_params)
    p params
    p user_params
    if @user.save!
      session[:user_id] = @user.id
      render json: @user
    else
      # TODO: Flash messages to inform of errors
      puts 'Error'
      redirect_to '/'
    end
  end

  def set_theme
    @user = User.find(params[:id])
    @user.update_columns(theme: params[:theme])
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end
end
