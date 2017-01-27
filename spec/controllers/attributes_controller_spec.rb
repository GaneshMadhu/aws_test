require 'rails_helper'

RSpec.describe AttributesController, type: :controller do

  before {controller.class.skip_before_filter :authenticate_user!}

  describe '#index' do
    it 'gets the list of attributes' do
      get :index
      attributes = controller.instance_variable_get(:@attributes)
      expect(attributes).to be_kind_of(Array)
      expect(attributes.count).to eq(4)
      expect(response).to render_template('index')
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
  end
end
