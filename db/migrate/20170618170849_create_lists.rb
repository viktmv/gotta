class CreateLists < ActiveRecord::Migration[5.1]
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.string :type
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
