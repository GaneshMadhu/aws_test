class AttributeMapper
  attr_reader :data

  def initialize(data)
    @data = data
  end

  def options
    {
      attributes: data
    }
  end
end
