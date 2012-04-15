window.recipes = new Recipes(recipes)
window.tags = new Tags(tags)
window.tagbar = new TagBarView(tags)
window.recipeview = new RecipeView(recipes.models[0])

tagbar.render()


recipeview.render()
$(".main").html(recipeview.$el)