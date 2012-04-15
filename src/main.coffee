window.recipes = new Recipes(recipes)
window.tags = new Tags(tags)
window.tagbar = new TagBarView(tags)
window.tag = new TagView

tagbar.render()

console.log tag.$el