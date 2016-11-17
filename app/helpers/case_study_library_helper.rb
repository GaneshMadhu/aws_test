module CaseStudyLibraryHelper
	def formatted_time(post_time)
		Time.parse(post_time).strftime("%d %b, %Y %H:%M")
	end
end
