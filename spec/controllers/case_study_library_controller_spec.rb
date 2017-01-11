require 'rails_helper'

RSpec.describe CaseStudyLibraryController, type: :controller do

  before {controller.class.skip_before_filter :authenticate_user!}

  let(:default_trait){"Ps"}
  let(:empty_trait){"Xs"}

  describe '#index' do
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
        get :index, {"filter_query":{"trait.code": default_trait}}
        posts = controller.instance_variable_get(:@posts)
        expect(posts.count).to be > 0
        expect(posts['data'][0]['trait']['code']).to eq(default_trait)
        expect(posts['data'].count).to be > 0
      end
    end

    after(:each) do
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template('index')
    end
  end

  describe '#filter' do
    context 'filters the trait data' do
      it 'for empty data' do
        xhr :post, :filter, {"filter":{"trait.code":[empty_trait]}}
        posts = controller.instance_variable_get(:@posts)
        expect(posts.count).to be > 0
        expect(posts['data'].count).to eq(0)
      end

      it 'for non-empty trait data' do
        xhr :post, :filter, {"filter":{"trait.code":[default_trait]}}
        posts = controller.instance_variable_get(:@posts)
        expect(posts.count).to be > 0
        expect(posts['data'][0]['trait']['code']).to eq(default_trait)
        expect(posts['data'].count).to be > 0
      end
    end

    after(:each) do
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template('filter')
    end
  end
end
