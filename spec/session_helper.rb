module SignInHelper
  def sign_in_as(user)
    post users_path(email: user.email, password: user.password)
  end
end
