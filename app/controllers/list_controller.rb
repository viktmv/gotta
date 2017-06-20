require 'net/http'
require 'httparty'
require 'opengraph_parser'

class ListController < ApplicationController
  skip_before_action :verify_authenticity_token

  include HTTParty

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
                        link: item[:itemLink],
                        img: item[:itemImage])
    end

    respond_to do |format|
      format.json { render json: list }
    end
  end

  # Handle metadata request
  def connect
    og = OpenGraph.new(params[:url])
    p og.metadata

    render json: og.metadata
  end

  def user_lists
    user = User.find(params[:id])
    render json: user.lists
  end
end
