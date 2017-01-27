require 'rails_helper'

RSpec.describe AttributeZoomInController, type: :controller do

  before {controller.class.skip_before_filter :authenticate_user!}

  let(:default_trait)    { "Ps" }
  let(:empty_trait)      { "Xs" }
  let(:post_metrics)     { controller.instance_variable_get(:@post_metrics) }
  let(:post_metric_data) { post_metrics['data'] }

  describe '#index' do
    context 'without filter_query' do
      it 'gets the API response' do
        get :index
      end
    end

    context 'with filter_query applied' do
      it 'gets the API response' do
        get :index, {"filter_query":{"trait.code": default_trait, "post_time": {'max': Date.today.strftime("%m/%d/%y"), 'min': (Date.today - 5.years).strftime("%m/%d/%y")}}}
        expect(post_metric_data['avg_time'][0]['view_posts']).to include(default_trait)
      end
    end

    after(:each) do
      expect(post_metrics.count).to be > 0
      expect(post_metric_data['avg_engagement']).to be_kind_of(Float)
      expect(post_metric_data).to have_key("avg_time")
      expect(post_metric_data['avg_time']).to be_kind_of(Array)
      expect(post_metric_data['avg_time']).to be_truthy
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template('index')
    end
  end

  describe '#filter' do
    context 'filters the trait data' do
      it 'for empty trait data' do
        xhr :post, :filter, {"filter":{"trait.code":[empty_trait]}}
        expect(post_metrics.count).to be > 0
        expect(post_metric_data['avg_engagement']).to be_kind_of(Float)
        expect(post_metric_data).to have_key("avg_time")
        expect(post_metric_data['avg_time']).to be_empty
        expect(post_metric_data['avg_time']).to be_truthy
      end

      it 'for non-empty trait data' do
        xhr :post, :filter, {"filter":{"trait.code":[default_trait]}}
        expect(post_metrics.count).to be > 0
        expect(post_metric_data['avg_engagement']).to be_kind_of(Float)
        expect(post_metric_data).to have_key("avg_time")
        expect(post_metric_data['avg_time'][0]['view_posts']).to include(default_trait)
        expect(post_metric_data['avg_time']).not_to be_empty
        expect(post_metric_data['avg_time']).to be_truthy
      end
    end

    after(:each) do
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template('filter')
    end
  end
end
