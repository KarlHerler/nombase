window.recipes = new Recipes(recipes)
window.tags = new Tags(tags)

class Workspace extends Backbone.Router
	routes: {
		'':			"show_root"
		"new":		"make_new",
		":r":		"recipe"
		":r/edit":	"edit_recipe"
	}

	show_root: =>
		window.recipesview = new RecipesView(recipes)
		recipesview.render()
		$(".main").html recipesview.$el
		searchbar = new SearchBarView
		searchbar.render()
		window.tagbar = new TagBarView(tags)
		tagbar.render()

	recipe: (r) =>
		recipeview = new RecipeView(recipes.get(r))
		recipeview.render()
		$(".main").html(recipeview.$el)
		searchbar = new SearchBarView
		searchbar.render()
		window.tagbar = new TagBarView(new Tags(({'name':t} for t in recipes.get(r).get("tags"))))
		tagbar.render()

	edit_recipe: (r) =>
		recipeview = new RecipeView(recipes.get(r))
		recipeview.edit()
		$(".main").html(recipeview.$el)
		$('#tags').tagsInput({'height':'35px','width':'600px','defaultText':''}); #enables the jquery.tagsinput plugin
		window.tagbar = new TagBarView(new Tags(({'name':t} for t in recipes.get(r).get("tags"))))
		tagbar.render()

	make_new: ->
		recipeview = new RecipeView()
		recipeview.edit()
		$(".main").html(recipeview.$el)
		$('#tags').tagsInput({'height':'35px','width':'600px','defaultText':''}); #enables the jquery.tagsinput plugin
		window.tagbar = new TagBarView(tags)
		tagbar.render()


window.app = new Workspace()
Backbone.history.start({pushState: true})




window.recipeview = new RecipeView(recipes.models[0])





recipeview.render()


#$(".main").html(recipeview.$el)
