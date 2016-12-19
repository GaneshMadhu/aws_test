require 'rails_helper'

RSpec.describe AttributeZoomInController, type: :controller do
  describe 'index' do
    context 'without filter_query' do
      it 'gets the API response' do
        get :index
        post_metrics = controller.instance_variable_get(:@post_metrics)
        expect(post_metrics.count).to be > 0
        expect(post_metrics['data']['avg_engagement']).to be_kind_of(Float)
        expect(post_metrics['data']).to have_key("avg_time")
        expect(post_metrics['data']['avg_time']).to be_kind_of(Array)
        expect(post_metrics['data']['avg_time']).to be_truthy
      end
    end

    context 'with filter_query applied' do
      it 'gets the API response' do
        get :index, {"filter_query":{"trait.code":"Ps", "post_time": {'max': Date.today.strftime("%m/%d/%y"), 'min': (Date.today - 1.years).strftime("%m/%d/%y")}}}
        post_metrics = controller.instance_variable_get(:@post_metrics)
        expect(post_metrics.count).to be > 0
        expect(post_metrics['data']['avg_engagement']).to be_kind_of(Float)
        expect(post_metrics['data']).to have_key("avg_time")
        expect(post_metrics['data']['avg_time']).to be_kind_of(Array)
        expect(post_metrics['data']['avg_time']).to be_truthy
      end
    end
  end

  describe 'filter' do
    it 'filters the data' do
      xhr :post, :filter, {"filter":{"trait.code":["Fg"]}}
      post_metrics = controller.instance_variable_get(:@post_metrics)
      expect(post_metrics.count).to be > 0
      expect(post_metrics['data']['avg_engagement']).to be_kind_of(Float)
      expect(post_metrics['data']).to have_key("avg_time")
      expect(post_metrics['data']['avg_time']).to be_empty
      expect(post_metrics['data']['avg_time']).to be_truthy
    end
  end
end
