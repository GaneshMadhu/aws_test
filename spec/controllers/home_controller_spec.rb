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

  describe '#clear_session' do
    before {
      session[:company_precode] = '1'
      session[:country_codes]   = ['In']
    }

    it 'logs out the logged in user', skip_hook: true do
      get :clear_session
      expect(session[:company_precode]).to be nil
      expect(session[:country_codes]).to be nil
    end
  end

  after(:each) do |example|
    unless example.metadata[:skip_hook]
      expect(response).to be_success
      expect(response).to have_http_status(200)
    else
      expect(response.redirect?).to be_truthy
      expect(response).to have_http_status(302)
      expect(response).to redirect_to 'http://test.host/auth/sign_out'
    end
  end
end
