class List < ApplicationRecord
  validates_presence_of :name

  belongs_to :user, optional: true
  has_many  :items

end
