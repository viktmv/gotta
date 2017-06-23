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
      list.items.create(name: item[:name],
                        description: item[:description],
                        link: item[:link],
                        img: item[:img])
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

  def edit
    list = List.find(params[:id])
    result = { list: list, list_items: list.items }
    render json: result
  end

  def text_message
    require 'twilio-ruby'

    # put your own credentials here
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']

    puts "Auth token is #{auth_token}"
    puts "SID is #{account_sid}"

    # and then you can create a new client without parameters
    @client = Twilio::REST::Client.new account_sid, auth_token

    from = '+14388004405'
    to = params[:tel]
    text = params[:description]
    @client.api.account.messages.create(
      from: from,
      to: to,
      body: text
    )

    puts "Sent message to #{to}"
    render json: 'lol'
  end
end
