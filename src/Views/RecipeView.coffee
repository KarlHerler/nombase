# The recipe view. Rendered in #main

class RecipeView extends Backbone.View
	id: "recipe"

	events: {
		"click #editRecipe":	"edit"
		"click #cancelEdit":	"render"
		"click #saveEdits":		"save"
	}

	initialize: =>
		@recipe = @options
		@$el.removeAttr("ingredients")
		@$el.removeAttr("title")
		@$el.removeAttr("instructions")
		@$el.removeAttr("tags")
		

	# Mutates view state
	# return: a recipe element
	render: =>
		view = @make_view()
		@$el.html view
		view

	# Mutates view state
	edit: =>
		editable = @make_editable()
		@$el.html editable
		editable

	save: =>
		console.log "Save me!"


	# return: a uneditable version of the view
	make_view: ->
		editbtn = 		"<div class='btn edit-btn' id='editRecipe'>Edit</div>"
		heading = 		"<h1>#{@recipe.get("title")}</h1>"
		ingredients = 	"<div class='ingredients'>
							<h2>Ingredients</h2>
							#{@recipe.get("ingredients")}
						</div>"
		instructions = 	"<div class='instructions'>
					      <h2>Instructions</h2>
					      #{@recipe.get("instructions")}
					    </div>"
		editbtn + heading + ingredients + instructions


	# return: an editable version of the view
	make_editable: ->
		editbtn = 		"<div class='btn btn-primary save-btn' id='saveEdits'>Save</div> 
						 <div class='btn cancel-btn' id='cancelEdit'>Cancel</div>"
		heading = 		"<input type='text' class='recipe-title' name='title' value='#{@recipe.get("title")}'></input>"
		ingredients = 	"<div class='ingredients'>
							<h2>Ingredients</h2>
							<textarea>#{@recipe.get("ingredients").replace(/<br>/g, '\n')}</textarea>
						</div>"
		instructions = 	"<div class='instructions'>
					      <h2>Instructions</h2>
					      <textarea>#{@recipe.get("instructions").replace(/<br>/g, '\n')}</textarea>
					    </div>"
		editbtn + heading + ingredients + instructions


