class Item < ApplicationRecord
  belongs_to :list
  has_many  :items
  
end
