require 'rails_helper'

RSpec.describe Item, type: :model do
  describe 'validations' do
    before :each do
      @user = User.create(email: 'bob333@bob.bob',
      password: '12345678',
      password_confirmation: '12345678',
      name: 'Samantha')

      @list = List.create(name: 'Books to read', kind: 'books', user: @user)
    end

    context 'item creation' do
      it 'should be created with specific list' do
        @list.items.create(name: 'item1', description: 'my fav book')
        @list.items.create(name: 'item2', description: 'my fav book')

        expect(@list.items.size).to be(2)
        expect(Item.count).to be(2)
      end

      it 'should raise an error if created without list' do
        item = Item.new(name: 'Something', description: 'hey')

        expect { item.save! }.to raise_error(ActiveRecord::RecordInvalid)
        expect(Item.count).to be(0)
      end

      it 'should be invalid without a name' do
        item = Item.new(description: 'hey')

        expect { item.save! }.to raise_error(ActiveRecord::RecordInvalid)
        expect(Item.count).to be(0)
      end
    end
  end
end


# create_table "items", force: :cascade do |t|
#   t.string "name", null: false
#   t.text "description"
#   t.string "link"
#   t.bigint "list_id", null: false
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.index ["list_id"], name: "index_items_on_list_id"
# end
