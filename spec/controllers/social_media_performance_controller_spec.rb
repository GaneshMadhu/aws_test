require 'rails_helper'

RSpec.describe SocialMediaPerformanceController, type: :controller do

  before {controller.class.skip_before_filter :authenticate_user!}

  let(:empty_precode)         { "007" }
  let(:tagging_metrics)       { controller.instance_variable_get(:@tagging_metrics) }
  let(:tagging_metric_data)   { tagging_metrics['data'] }
  let(:tagging_metric_traits) { tagging_metrics['attributes'] }

  before(:each) do
    session['company_name']       = 'Google'
    session['company_group_name'] = 'India'
  end

  describe '#index' do
    context 'without filter_query' do
      it 'gets the API response' do
        get :index
        expect(tagging_metrics.count).to be > 0
        expect(tagging_metric_data['tags_count']).to be_kind_of(Integer)
        expect(tagging_metric_data).to have_key('tags')
        expect(tagging_metric_data['tags']).to be_kind_of(Hash)
        expect(tagging_metric_data['tags']).to be_truthy
        expect(tagging_metric_traits).to be_kind_of(Array)
        expect(tagging_metric_traits.count).to eq(4)
        expect(response).to render_template('index')
      end
    end
  end

  describe '#filter' do
    it 'filters the data' do
      xhr :post, :filter, {"filter":{"company_precode":[empty_precode]}}
      expect(tagging_metrics.count).to be > 0
      expect(tagging_metric_data['tags_count']).to be_kind_of(Integer)
      expect(tagging_metric_data).not_to have_key('tags')
      expect(tagging_metric_data['tags']).to be_nil
      expect(tagging_metric_data['tags']).not_to be_truthy
      expect(response).to render_template('filter')
    end
  end

  after(:each) do
    expect(response).to be_success
    expect(response).to have_http_status(200)
  end
end
