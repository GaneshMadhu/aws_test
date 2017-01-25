class HomepageController < ApplicationController
	skip_before_action :ensure_iris_customer!, except: :index

  def index
  end

  def how_iris_works
  end
end
