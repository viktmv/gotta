class AddImgToItems < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :img, :string
  end
end
