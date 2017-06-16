require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'Validations' do
    before :each do
      @password = '12345678910'
    end

    it 'should be saved with all keys present' do
      user = User.new(email: 'bob333@bob.bob',
      password: @password,
      password_confirmation: @password,
      name: 'Samantha')

      expect(user.valid?).to be(true)

      user.save!
      expect(User.count).to be(1)
    end

    it 'should be created with password and confirmation' do
      user = User.new(name: 'Bob', email: 'bob222@bob.bob')
      user.valid?
      expect(user.errors).to have_key(:password)
      expect(user.errors).to have_key(:password_confirmation)
    end

    it 'should be created with name' do
      user = User.new(password: 'bob',
                      password_confirmation: 'bob2',
                      email: 'bob@bob.bob')
      user.valid?
      expect(user.errors).to have_key(:name)
    end

    it 'should be created with email' do
      user = User.new(password: @password,
                      password_confirmation: @password,
                      name: 'John')
      user.valid?
      expect(user.errors).to have_key(:email)
    end

    it 'password and confirmation must match' do
      user = User.new(password: @password, password_confirmation: 'bob2')
      user.valid?
      # expect(user.errors).to have_key(:password)
      expect(user.errors).to have_key(:password_confirmation)
    end

    it 'shoud have a unique email' do
      user0 = User.new(email: 'bob@bob.bob',
                        password: @password,
                        password_confirmation: @password,
                        name: 'Samantha')
      user0.save!

      user1 = User.new(email: 'BOB@BOB.BOB',
                        password: @password,
                        password_confirmation: @password,
                        name: 'Alice')

      expect { user1.save! }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'should have a minimum password length of 8' do
      user = User.new(email: 'bob@bob.bob',
                        password: 'short',
                        password_confirmation: 'short',
                        name: 'Samantha')
      user.valid?
      expect(user.errors).to have_key(:password)
    end
  end

  describe '.authenticate_with_credentials' do
    before :each do
      @email = 'bob3@bob.bob'
      @password = '12345678'
      user = User.new(email: @email,
                      password: @password,
                      password_confirmation: @password,
                      name: 'Samantha')
       user.save!
    end

    it 'should allow user to authenticate with credentials' do
      user = User.authenticate_with_credentials(@email, @password)
      expect(user).to be_a(User)
    end

    it 'should return false with invalid password' do
      user = User.authenticate_with_credentials(@email, 'lolno')
      expect(user).to be(false)
    end

    it 'should login even even with trailing whitespaces' do
      user = User.authenticate_with_credentials("   #{@email}   ", @password)
      expect(user).to be_a(User)
    end

    it 'should login even even disregarding the case' do
      user = User.authenticate_with_credentials(" BOB3@BoB.bob ", @password)
      expect(user).to be_a(User)
    end
  end
end
