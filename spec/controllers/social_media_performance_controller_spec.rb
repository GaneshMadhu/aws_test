require 'rails_helper'

RSpec.describe SocialMediaPerformanceController, type: :controller do

  before(:each) do
    session['company_name']       = 'Google'
    session['company_group_name'] = 'India'
  end

  describe 'index' do
    context 'without filter_query' do
      it 'gets the API response' do
        get :index
        tagging_metrics = controller.instance_variable_get(:@tagging_metrics)
        expect(tagging_metrics.count).to be > 0
        expect(tagging_metrics['data']['tags_count']).to be_kind_of(Integer)
        expect(tagging_metrics['data']).to have_key('tags')
        expect(tagging_metrics['data']['tags']).to be_kind_of(Hash)
        expect(tagging_metrics['data']['tags']).to be_truthy
      end
    end
  end

  describe 'filter' do
    it 'filters the data' do
      process :filter, method: :post, xhr: true, params: {"filter":{"company_precode":["0123"]}}
      tagging_metrics = controller.instance_variable_get(:@tagging_metrics)
      expect(tagging_metrics.count).to be > 0
      expect(tagging_metrics['data']['tags_count']).to be_kind_of(Integer)
      expect(tagging_metrics['data']).not_to have_key('tags')
      expect(tagging_metrics['data']['tags']).to be_nil
      expect(tagging_metrics['data']['tags']).not_to be_truthy
    end
  end
end
