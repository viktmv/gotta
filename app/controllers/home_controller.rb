class HomeController < ApplicationController
  # before_action :authenticate_request!

  def index
  end

  def new
    render layout: "list"
  end
end
