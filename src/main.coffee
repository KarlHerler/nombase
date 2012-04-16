window.recipes = new Recipes(recipes)
window.tags = new Tags(tags)

class Workspace extends Backbone.Router
	routes: {
		'':		"show_root"
		"new":	"make_new",
		"recipe/:r":	"recipe"
	}

	show_root: =>
		window.recipesview = new RecipesView(recipes)
		recipesview.render()
		$(".main").html recipesview.$el

	recipe: (r) =>
		recipeview = new RecipeView(recipes.get(r))
		recipeview.render()
		$(".main").html(recipeview.$el)

	make_new: ->
		console.log "newnew"


window.app = new Workspace()
Backbone.history.start({pushState: true})

#app.navigate '', true


window.tagbar = new TagBarView(tags)
window.recipeview = new RecipeView(recipes.models[0])



tagbar.render()


recipeview.render()


#$(".main").html(recipeview.$el)
