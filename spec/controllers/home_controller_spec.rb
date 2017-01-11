require 'rails_helper'

RSpec.describe HomeController, type: :controller do

  before {controller.class.skip_before_filter :authenticate_user!}

  describe '#terms_and_conditions' do
    it 'get terms and contidions' do
      get :terms_and_conditions
      expect(response).to render_template('home/terms_and_conditions')
    end
  end

  describe '#privacy_policy' do
    it 'get privacy policy' do
      get :privacy_policy
      expect(response).to render_template('home/privacy_policy')
    end
  end

  describe '#faqs' do
    it 'gets the list of faqs' do
      get :faqs
      faqs = controller.instance_variable_get(:@faqs)
      expect(faqs).to be_kind_of(Array)
      expect(faqs.map{|a| a['for_ife']}.compact.uniq).not_to include(false)
      expect(response).to render_template('home/faqs')
    end
  end

  after(:each) do
    expect(response).to be_success
    expect(response).to have_http_status(200)
  end
end
