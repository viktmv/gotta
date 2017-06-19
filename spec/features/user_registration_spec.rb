require 'rails_helper'
#
# RSpec.feature "User Registers", type: :feature, js: true do
#   before :each do
#     user = User.new(name: 'Vik',
#                     email: 'text@email.com',
#                     password: '12345678',
#                     password_confirmation: '12345678')
#     user.save!
#   end
#
#   scenario "User can login with valid credentials" do
#     # ACT
#     visit '/'
#
#     fill_in 'email', with: 'text@email.com'
#     fill_in 'password', with: '12345678'
#     click_button 'Submit'
#
#     within('nav') { expect(page).to have_content('text@email.com') }
#     save_screenshot
#   end
# end
