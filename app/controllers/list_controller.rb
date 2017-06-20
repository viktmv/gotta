require 'net/http'

class ListController < ApplicationController
  skip_before_action :verify_authenticity_token

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

  def connect
    # params.permit(:url)


    url = URI.parse(params[:url])
    req = Net::HTTPS::Get.new(url.to_s)
    res = Net::HTTPS.start(url.host, url.port) {|http|
      http.request(req)
    }
    puts res.body

  end

  def user_lists
    user = User.find(params[:id])
    render json: user.lists
  end

  def link_params
    # params.permit(:url)
  end
end
