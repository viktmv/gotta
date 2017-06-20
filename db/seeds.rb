# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

list = List.create(name: 'My list of cool stuff')

list.items.create(name: 'Cool thing #1', description: 'Something extremely cool #1', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #2', description: 'Something extremely cool #2', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #3', description: 'Something extremely cool #3', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #4', description: 'Something extremely cool #4', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #5', description: 'Something extremely cool #5', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #6', description: 'Something extremely cool #6', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #7', description: 'Something extremely cool #7', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #8', description: 'Something extremely cool #8', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #9', description: 'Something extremely cool #9', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #10', description: 'Something extremely cool #10', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #11', description: 'Something extremely cool #11', link: 'https://amazon.ca')
list.items.create(name: 'Cool thing #12', description: 'Something extremely cool #12', link: 'https://amazon.ca')
