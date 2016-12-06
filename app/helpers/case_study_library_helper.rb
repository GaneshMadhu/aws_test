module CaseStudyLibraryHelper
	def formatted_time(post_time)
		Time.parse(post_time).strftime("%d %b, %Y %H:%M")
	end

  def image_view(src,alt)
    image_tag(src || image_path("no_post_image.png"), alt: (alt.blank? ? "No Preview Available" : alt))
  end
end
