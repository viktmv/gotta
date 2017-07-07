class HomeController < ApplicationController
  # before_action :authenticate_request!

  def index
    @googleAPI = ENV['GOOGLE_API']
  end

  def new
    render layout: "list"
  end
end
