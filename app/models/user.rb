class User < ApplicationRecord
  before_validation :trim_downcase_email
  has_many :lists
  
  has_secure_password

  def self.authenticate_with_credentials(email, password)
    user = User.find_by(email: email.downcase.strip)
    user.authenticate(password) if user
  end

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 8, too_short: 'Password is too short!' }, presence: true
  validates :password_confirmation, presence: true

  private

  def trim_downcase_email
    self.email = email.downcase.strip if email.present?
  end
end
