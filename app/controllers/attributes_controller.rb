class AttributesController < ApplicationController
  def index
    iris = IrisEngine::IrisApi.new
    @attributes = iris.search
  end
end
