require 'rails_helper'

RSpec.describe CaseStudyLibraryController, type: :controller do
  describe 'index' do
    context 'without filter_query' do
      it 'gets the API response' do
        get :index
        posts = controller.instance_variable_get(:@posts)
        expect(posts.count).to be > 0
        expect(posts['data'].count).to be > 5
      end
    end

    context 'with filter_query applied' do
      it 'gets the API response' do
        get :index, {"filter_query"=>{"trait.code"=>"Ps"}}
        posts = controller.instance_variable_get(:@posts)
        expect(posts.count).to be > 0
        expect(posts['data'].count).to be > 0
      end
    end
  end

  describe 'filter' do
    it 'filters the data' do
      xhr :post, :filter, {"filter"=>{"trait.code"=>["Fg"]}}
      posts = controller.instance_variable_get(:@posts)
      expect(posts.count).to be > 0
      expect(posts['data'].count).to eq(0)
    end
  end
end
