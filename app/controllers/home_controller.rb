class HomeController < ApplicationController
  def index
  end

  def new
    render layout: "list"
  end
end
