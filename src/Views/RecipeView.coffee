# The recipe view. Rendered in #main

class RecipeView extends Backbone.View
	id: "recipe"

	events: {
		"click #editRecipe":	"navigate_edit"
		"click #cancelEdit":	"back"
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
	edit: ->
		editable = @make_editable()
		@$el.html editable
		editable

	navigate_edit: ->
		console.log "/#{@recipe.get("id")}/edit"
		app.navigate "/#{@recipe.get("id")}/edit", true 

	save: ->
		if $("input[name=title]").val()!=""
			@recipe = new Recipe() if @has("id")==""
			@recipe.set({'title': $("input[name=title]").val() }) 
		if $("textarea[name=ingredients]").val()!=""						
			@recipe.set({'ingredients': $("textarea[name=ingredients]").val().replace(/\n\r?/g, "<br>") }) 
		if $("textarea[name=instructions]").val()!=""	
			@recipe.set({'instructions': $("textarea[name=instructions]").val().replace(/\n\r?/g, "<br>") })
		if $("#tags").val()!="" or $("#tags").val()==undefined
			@recipe.set({'tags':$("#tags").val().split(/,/g)})
		
		@recipe.save(null, {
			success: (model, response) -> 
				loc = window.location.href.split("/")
				loc[loc.length-1] = model.id if loc[loc.length-1]=="new"
				loc.pop()					 if loc[loc.length-1]=="edit"
				window.location = loc.join("/")
		})
		


	back: ->
		history.go(-1)

	# return: a uneditable version of the view
	make_view: ->
		editbtn = 		"<div class='controls'>
							<a class='btn' href='/'><i class='icon-arrow-left'></i></a>
							<div class='btn edit-btn' id='editRecipe'><i class='icon-pencil'></i></div>
						</div>"
		heading = 		"<h1>#{@recipe.get("title")}</h1>"
		ingredients = 	"<div class='ingredients'>
							<h2>Ingredients</h2>
							#{@recipe.get("ingredients")}
						</div>"
		instructions = 	"<div class='instructions'>
					      <h2>Instructions</h2>
					      #{@recipe.get("instructions")}
					    </div>"
		"<div id='recipe' class='recipe'>"+editbtn + heading + ingredients + instructions + "</div>"


	# return: an editable version of the view
	make_editable: ->
		title = @has "title"
		ingredients = (@has "ingredients").replace(/<br>/g, "\n")
		instructions = (@has "instructions").replace(/<br>/g, "\n")
		tags = (t["name"] for t in @has "tags")
		
		editbtn = 		"<div class='controls'>
							<div class='btn btn-primary save-btn' id='saveEdits'>
								<i class='icon-ok'></i>
							</div> 
						 	<div class='btn cancel-btn' id='cancelEdit'>
						 		<i class='icon-ban-circle'></i>
						 	</div>
						 </div>"
		heading = 		"<input type='text' class='recipe-title' name='title' value='#{title}'></input>"
		ingredients = 	"<div class='ingredients'>
							<h2>Ingredients</h2>
							<textarea name='ingredients'>#{ingredients}</textarea>
						</div>"
		instructions = 	"<div class='instructions'>
					      <h2>Instructions</h2>
					      <textarea name='instructions'>#{instructions}</textarea>
					    </div>"
		tags =			"<div class='tags'>
							<h2>Tags</h2>
							<input name='tags' id='tags' value='#{tags}' />
						</div>"
		"<div id='recipe' class='recipe'>" + editbtn + heading + ingredients + instructions + tags + "</div>"

	# Conditional assignment 
	# returns existing if existing or 
	has: (v) ->
		try
			return @recipe.get(v)
		catch error
			return ""


