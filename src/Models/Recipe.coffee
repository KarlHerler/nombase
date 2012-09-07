# Represents a single Recipe
# Attributes: 	title(str), 
#				ingredients(str),  
#				instructions(str)
#				tags(Tag)

class Recipe extends Backbone.Model
	initialize: =>
		#@id = @get("title").toLowerCase().replace(/\ /, "-") unless @id
		@urlRoot = "/"


	parse: (response, xhr) ->
		rsp = JSON.parse(response.replace(/\'/g, '"'))
		@id = 			rsp.id
		@title = 		rsp.title
		@ingredients = 	rsp.ingredients
		@instructions = rsp.instructions
		@tags = 		rsp.tags
