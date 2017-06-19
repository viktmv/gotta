class ListController < ApplicationController
  def show
    @list = List.find(params[:id])

    render 'show', layout: 'list'
  end

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

    respond_to do |format|
      format.json { render json: list }
    end
  end
end
