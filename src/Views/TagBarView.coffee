# The sidebar that shows tags

class TagBarView extends Backbone.View
	el: $("#TagBar")

	render: =>
		pre = "<h2>Tags</h2>"
		ret =  ((@make("a", {"class": "tag", "name": t.get("name")}, t.get("name"))).outerHTML for t in @options.models)
		ret = "#{pre}#{ret.join(", ")}"
		$(this.el).html(ret)
		ret

