class ListController < ApplicationController
  def show
    @list = List.find(params[:id])

    render json: @list
  end

  def 

  def create
    puts 'List create request received'

    user = params[:user].present? ? User.find_by(email: params[:user][:email]) : nil

    list = List.new(name: params[:name], user: user )
    list.save!

    params[:items].each do |item|
      list.items.create(name: item[:itemName],
                        description: item[:itemDescription],
                        link: item[:itemLink])
    end

    render json: list
  end
end
