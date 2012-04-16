# The recipe view. Rendered in #main

class RecipesView extends Backbone.View
	id: "recipes"
	className: "recipes"

	events: {
		"click .recipe": "showRecipe"
	}

	initialize: =>
		@recipes = @options.models
		@$el.removeAttr("ingredients")
		@$el.removeAttr("title")
		@$el.removeAttr("instructions")
		@$el.removeAttr("tags")


	render: =>
		ret = (@make_recipe_view(r) for r in @recipes).join ""
		@$el.html ret
		ret


	make_recipe_view: (recipe) ->
		heading = 		"<h1>#{recipe.get("title")}</h1>"
		ingredients = 	"<div class='ingredients'>
							<h2>Ingredients</h2>
							#{recipe.get("ingredients")}
						</div>"
		instructions = 	"<div class='instructions'>
					      <h2>Instructions</h2>
					      #{recipe.get("instructions")}
					    </div>"
		"<div class='recipe' data-recipe='#{recipe.id}'>" + heading + ingredients + instructions + "</div>"

	showRecipe: (e) ->
		recipe = [e.target] if $(e.target).hasClass("recipe")
		recipe = $(e.target).parent() if $(e.target).parent().hasClass("recipe")
		recipe = $(e.target).parent().parent() if $(e.target).parent().parent().hasClass("recipe")
		recipe = $(e.target).parent().parent().parent() if $(e.target).parent().parent().parent().hasClass("recipe")
		app.navigate "/#{$(recipe).data("recipe")}", true
		false