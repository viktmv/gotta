require 'auth_token'

class SessionController < ApplicationController
  def create
    if user = User.authenticate_with_credentials(params[:email], params[:password])
      render json: authentication_payload(user)
      puts 'success'
    else
      render json: { errors: ['Invalid username or password'] }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    # redirect_to '/login'
  end

  private

  def authentication_payload(user)
    return nil unless user && user.id
    {
      auth_token: AuthToken.encode({ user_id: user.id }),
      user: { id: user.id, email: user.email } # return whatever user info you need
    }
  end

end
