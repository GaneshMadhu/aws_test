require 'rails_helper'

RSpec.describe AttributeZoomInController, type: :controller do

  let(:default_trait){"Ps"}
  let(:empty_trait){"Fg"}

  describe '#index' do
    context 'without filter_query' do
      it 'gets the API response' do
        get :index
      end
    end

    context 'with filter_query applied' do
      it 'gets the API response' do
        get :index, params: {"filter_query":{"trait.code": default_trait, "post_time": {'max': Date.today.strftime("%m/%d/%y"), 'min': (Date.today - 1.years).strftime("%m/%d/%y")}}}
        @post_metrics = controller.instance_variable_get(:@post_metrics)
        expect(@post_metrics['data']['avg_time'][0]['view_posts']).to include(default_trait)
      end
    end

    after(:each) do
      post_metrics = @post_metrics || controller.instance_variable_get(:@post_metrics)
      expect(post_metrics.count).to be > 0
      expect(post_metrics['data']['avg_engagement']).to be_kind_of(Float)
      expect(post_metrics['data']).to have_key("avg_time")
      expect(post_metrics['data']['avg_time']).to be_kind_of(Array)
      expect(post_metrics['data']['avg_time']).to be_truthy
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template('index')
    end
  end

  describe '#filter' do
    context 'filters the trait data' do
      it 'for empty trait data' do
        process :filter, method: :post, xhr: true, params: {"filter":{"trait.code":[empty_trait]}}
        post_metrics = controller.instance_variable_get(:@post_metrics)
        expect(post_metrics.count).to be > 0
        expect(post_metrics['data']['avg_engagement']).to be_kind_of(Float)
        expect(post_metrics['data']).to have_key("avg_time")
        expect(post_metrics['data']['avg_time']).to be_empty
        expect(post_metrics['data']['avg_time']).to be_truthy
      end

      it 'for non-empty trait data' do
        process :filter, method: :post, xhr: true, params: {"filter":{"trait.code":[default_trait]}}
        post_metrics = controller.instance_variable_get(:@post_metrics)
        expect(post_metrics.count).to be > 0
        expect(post_metrics['data']['avg_engagement']).to be_kind_of(Float)
        expect(post_metrics['data']).to have_key("avg_time")
        expect(post_metrics['data']['avg_time'][0]['view_posts']).to include(default_trait)
        expect(post_metrics['data']['avg_time']).not_to be_empty
        expect(post_metrics['data']['avg_time']).to be_truthy
      end
    end

    after(:each) do
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template('filter')
    end
  end
end
