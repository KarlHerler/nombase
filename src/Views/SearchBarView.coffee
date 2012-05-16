# The Search bar.

class SearchBarView extends Backbone.View
	el: $("#form_search")
	events: {
		'keyup #searchfield': 'filter'
	}

	render: =>
		ret = "<input type='text' id='searchfield' class='input-medium searchfield' placeholder='e.g. Salad'>
			   <button type='submit' class='btn'>Search</button>"
		$(this.el).html(ret)
		ret
	filter: (e) ->
		search_string = $(e.target).val()
		search_reg = new RegExp(search_string, 'igm')
		if search_string.length==0
			window.recipesview = new RecipesView(window.recipes)
		else
			window.recipesview = new RecipesView(new Recipes(window.recipes.filter((recipe) ->
				title_result = recipe.get("title").match(search_reg)
				ingredients_result = recipe.get("ingredients").match(search_reg)
				instructions_result = recipe.get("instructions").match(search_reg)
				#tags_results = t.match(search_reg) for t in recipe.get("tags")
				
				result = 0
				result += title_result.length 		 unless title_result==null
				result += ingredients_result.length	 unless ingredients_result==null
				result += instructions_result.length unless instructions_result==null

				(result > 0)
			))) 
		recipesview.render()
		$(".main").html recipesview.$el

