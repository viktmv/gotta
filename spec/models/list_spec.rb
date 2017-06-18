require 'rails_helper'

RSpec.describe List, type: :model do
  describe 'Validations' do
    before :each do
      @user = User.new(email: 'bob333@bob.bob',
      password: '12345678',
      password_confirmation: '12345678',
      name: 'Samantha')
      @user.save!
    end

    context 'list creation' do
      it 'should belong to specific user' do
        @user.lists.create(name: 'test1', kind: 'lol')

        expect(List.count).to be(1)
        expect(@user.lists.size).to be(1)
      end

      it 'should be created to with name present' do
        list = List.new(name: 'test2', kind: 'lol', user: @user)

        expect(list.valid?).to be(true)
        list.save!
        expect(List.count).to be(1)
      end

      it 'should be ivalid to without name ' do
        list = List.new(kind: 'lol')

        expect(list.valid?).to be(false)
        expect { list.save! }.to raise_error(ActiveRecord::RecordInvalid)
        expect(List.count).to be(0)
      end
    end
  end
end
