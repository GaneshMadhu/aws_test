require 'rails_helper'

RSpec.describe HomepageController, type: :controller do
  describe 'index' do
    it 'have 200 success code' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
      expect(response).to render_template('index')
    end
  end

  describe 'how_iris_works' do
    it 'renders how_iris_works' do
      get :how_iris_works
      expect(response).to render_template('how_iris_works')
    end
  end
end
