class AttributesController < ApplicationController
  def index
    iris = IrisEngine::IrisApi.new
    @attributes = iris.search("attributes",{})
  end
end
