class AttributesController < ApplicationController
  def index
    iris = IrisEngine::IrisApi.new
    @attributes = iris.case_study_search("attributes",{})
  end
end
