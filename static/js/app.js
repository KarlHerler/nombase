(function() {
  var Recipe, RecipeView, Recipes, RecipesView, SearchBarView, Tag, TagBarView, Tags, Workspace;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Recipe = (function() {
    __extends(Recipe, Backbone.Model);
    function Recipe() {
      this.initialize = __bind(this.initialize, this);
      Recipe.__super__.constructor.apply(this, arguments);
    }
    Recipe.prototype.initialize = function() {
      return this.urlRoot = "/";
    };
    Recipe.prototype.parse = function(response, xhr) {
      var rsp;
      rsp = JSON.parse(response.replace(/\'/g, '"'));
      this.id = rsp.id;
      this.title = rsp.title;
      this.ingredients = rsp.ingredients;
      this.instructions = rsp.instructions;
      return this.tags = rsp.tags;
    };
    return Recipe;
  })();
  Tag = (function() {
    __extends(Tag, Backbone.Model);
    function Tag() {
      Tag.__super__.constructor.apply(this, arguments);
    }
    return Tag;
  })();
  Recipes = (function() {
    __extends(Recipes, Backbone.Collection);
    function Recipes() {
      Recipes.__super__.constructor.apply(this, arguments);
    }
    Recipes.prototype.model = Recipe;
    return Recipes;
  })();
  Tags = (function() {
    __extends(Tags, Backbone.Collection);
    function Tags() {
      Tags.__super__.constructor.apply(this, arguments);
    }
    Tags.prototype.model = Tag;
    return Tags;
  })();
  RecipeView = (function() {
    __extends(RecipeView, Backbone.View);
    function RecipeView() {
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      RecipeView.__super__.constructor.apply(this, arguments);
    }
    RecipeView.prototype.id = "recipe";
    RecipeView.prototype.events = {
      "click #editRecipe": "navigate_edit",
      "click #cancelEdit": "back",
      "click #saveEdits": "save"
    };
    RecipeView.prototype.initialize = function() {
      this.recipe = this.options;
      this.$el.removeAttr("ingredients");
      this.$el.removeAttr("title");
      this.$el.removeAttr("instructions");
      return this.$el.removeAttr("tags");
    };
    RecipeView.prototype.render = function() {
      var view;
      view = this.make_view();
      this.$el.html(view);
      return view;
    };
    RecipeView.prototype.edit = function() {
      var editable;
      editable = this.make_editable();
      this.$el.html(editable);
      return editable;
    };
    RecipeView.prototype.navigate_edit = function() {
      console.log("/" + (this.recipe.get("id")) + "/edit");
      return app.navigate("/" + (this.recipe.get("id")) + "/edit", true);
    };
    RecipeView.prototype.save = function() {
      if ($("input[name=title]").val() !== "") {
        if (this.has("id") === "") {
          this.recipe = new Recipe();
        }
        this.recipe.set({
          'title': $("input[name=title]").val()
        });
      }
      if ($("textarea[name=ingredients]").val() !== "") {
        this.recipe.set({
          'ingredients': $("textarea[name=ingredients]").val().replace(/\n\r?/g, "<br>")
        });
      }
      if ($("textarea[name=instructions]").val() !== "") {
        this.recipe.set({
          'instructions': $("textarea[name=instructions]").val().replace(/\n\r?/g, "<br>")
        });
      }
      return this.recipe.save(null, {
        success: function(model, response) {
          var loc;
          loc = window.location.href.split("/");
          if (loc[loc.length - 1] === "new") {
            loc[loc.length - 1] = model.id;
          }
          if (loc[loc.length - 1] === "edit") {
            loc.pop();
          }
          return window.location = loc.join("/");
        }
      });
    };
    RecipeView.prototype.back = function() {
      return history.go(-1);
    };
    RecipeView.prototype.make_view = function() {
      var editbtn, heading, ingredients, instructions;
      editbtn = "<div class='controls'>							<a class='btn' href='/'><i class='icon-arrow-left'></i></a>							<div class='btn edit-btn' id='editRecipe'><i class='icon-pencil'></i></div>						</div>";
      heading = "<h1>" + (this.recipe.get("title")) + "</h1>";
      ingredients = "<div class='ingredients'>							<h2>Ingredients</h2>							" + (this.recipe.get("ingredients")) + "						</div>";
      instructions = "<div class='instructions'>					      <h2>Instructions</h2>					      " + (this.recipe.get("instructions")) + "					    </div>";
      return "<div id='recipe' class='recipe'>" + editbtn + heading + ingredients + instructions + "</div>";
    };
    RecipeView.prototype.make_editable = function() {
      var editbtn, heading, ingredients, instructions, tags, title;
      title = this.has("title");
      ingredients = (this.has("ingredients")).replace(/<br>/g, "\n");
      instructions = (this.has("instructions")).replace(/<br>/g, "\n");
      tags = this.has("tags");
      editbtn = "<div class='controls'>							<div class='btn btn-primary save-btn' id='saveEdits'>								<i class='icon-ok'></i>							</div> 						 	<div class='btn cancel-btn' id='cancelEdit'>						 		<i class='icon-ban-circle'></i>						 	</div>						 </div>";
      heading = "<input type='text' class='recipe-title' name='title' value='" + title + "'></input>";
      ingredients = "<div class='ingredients'>							<h2>Ingredients</h2>							<textarea name='ingredients'>" + ingredients + "</textarea>						</div>";
      instructions = "<div class='instructions'>					      <h2>Instructions</h2>					      <textarea name='instructions'>" + instructions + "</textarea>					    </div>";
      tags = "<div class='tags'>							<h2>Tags</h2>							<input name='tags' id='tags' value='" + tags + "' />						</div>";
      return "<div id='recipe' class='recipe'>" + editbtn + heading + ingredients + instructions + tags + "</div>";
    };
    RecipeView.prototype.has = function(v) {
      try {
        return this.recipe.get(v);
      } catch (error) {
        return "";
      }
    };
    return RecipeView;
  })();
  RecipesView = (function() {
    __extends(RecipesView, Backbone.View);
    function RecipesView() {
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      RecipesView.__super__.constructor.apply(this, arguments);
    }
    RecipesView.prototype.id = "recipes";
    RecipesView.prototype.className = "recipes";
    RecipesView.prototype.events = {
      "click .recipe": "showRecipe",
      "click #newRecipe": "newRecipe"
    };
    RecipesView.prototype.initialize = function() {
      this.recipes = this.options.models;
      this.$el.removeAttr("ingredients");
      this.$el.removeAttr("title");
      this.$el.removeAttr("instructions");
      return this.$el.removeAttr("tags");
    };
    RecipesView.prototype.render = function() {
      var controls, r, ret;
      controls = "<div class='controls'>						<div class='btn ralign' id='newRecipe'>							<i class='icon-plus'></i>						</div>					</div>";
      ret = controls + ((function() {
        var _i, _len, _ref, _results;
        _ref = this.recipes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          _results.push(this.make_recipe_view(r));
        }
        return _results;
      }).call(this)).join("");
      this.$el.html(ret);
      return ret;
    };
    RecipesView.prototype.make_recipe_view = function(recipe) {
      var heading, ingredients, instructions;
      heading = "<h1>" + (recipe.get("title")) + "</h1>";
      ingredients = "<div class='ingredients'>							<h2>Ingredients</h2>							" + (recipe.get("ingredients")) + "						</div>";
      instructions = "<div class='instructions'>					      <h2>Instructions</h2>					      " + (recipe.get("instructions")) + "					    </div>";
      return ("<div class='recipe' data-recipe='" + recipe.id + "'>") + heading + ingredients + instructions + "</div>";
    };
    RecipesView.prototype.showRecipe = function(e) {
      var recipe;
      if ($(e.target).hasClass("recipe")) {
        recipe = [e.target];
      }
      if ($(e.target).parent().hasClass("recipe")) {
        recipe = $(e.target).parent();
      }
      if ($(e.target).parent().parent().hasClass("recipe")) {
        recipe = $(e.target).parent().parent();
      }
      if ($(e.target).parent().parent().parent().hasClass("recipe")) {
        recipe = $(e.target).parent().parent().parent();
      }
      app.navigate("/" + ($(recipe).data("recipe")), true);
      return false;
    };
    RecipesView.prototype.newRecipe = function() {
      return app.navigate("/new", true);
    };
    return RecipesView;
  })();
  SearchBarView = (function() {
    __extends(SearchBarView, Backbone.View);
    function SearchBarView() {
      this.render = __bind(this.render, this);
      SearchBarView.__super__.constructor.apply(this, arguments);
    }
    SearchBarView.prototype.el = $("#form_search");
    SearchBarView.prototype.events = {
      'keyup #searchfield': 'filter'
    };
    SearchBarView.prototype.render = function() {
      var ret;
      ret = "<input type='text' id='searchfield' class='input-medium searchfield' placeholder='e.g. Salad'>			   <button type='submit' class='btn'>Search</button>";
      $(this.el).html(ret);
      return ret;
    };
    SearchBarView.prototype.filter = function(e) {
      var search_reg, search_string;
      search_string = $(e.target).val();
      search_reg = new RegExp(search_string, 'igm');
      if (search_string.length === 0) {
        window.recipesview = new RecipesView(window.recipes);
      } else {
        window.recipesview = new RecipesView(new Recipes(window.recipes.filter(function(recipe) {
          var ingredients_result, instructions_result, result, title_result;
          title_result = recipe.get("title").match(search_reg);
          ingredients_result = recipe.get("ingredients").match(search_reg);
          instructions_result = recipe.get("instructions").match(search_reg);
          result = 0;
          if (title_result !== null) {
            result += title_result.length;
          }
          if (ingredients_result !== null) {
            result += ingredients_result.length;
          }
          if (instructions_result !== null) {
            result += instructions_result.length;
          }
          return result > 0;
        })));
      }
      recipesview.render();
      return $(".main").html(recipesview.$el);
    };
    return SearchBarView;
  })();
  TagBarView = (function() {
    __extends(TagBarView, Backbone.View);
    function TagBarView() {
      this.render = __bind(this.render, this);
      TagBarView.__super__.constructor.apply(this, arguments);
    }
    TagBarView.prototype.el = $("#TagBar");
    TagBarView.prototype.render = function() {
      var pre, ret, t;
      pre = "<h2>Tags</h2>";
      ret = (function() {
        var _i, _len, _ref, _results;
        _ref = this.options.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          _results.push((this.make("a", {
            "class": "tag",
            "name": t.get("name")
          }, t.get("name"))).outerHTML);
        }
        return _results;
      }).call(this);
      ret = "" + pre + (ret.join(", "));
      $(this.el).html(ret);
      return ret;
    };
    return TagBarView;
  })();
  window.recipes = new Recipes(recipes);
  window.tags = new Tags(tags);
  Workspace = (function() {
    __extends(Workspace, Backbone.Router);
    function Workspace() {
      this.edit_recipe = __bind(this.edit_recipe, this);
      this.recipe = __bind(this.recipe, this);
      this.show_root = __bind(this.show_root, this);
      Workspace.__super__.constructor.apply(this, arguments);
    }
    Workspace.prototype.routes = {
      '': "show_root",
      "new": "make_new",
      ":r": "recipe",
      ":r/edit": "edit_recipe"
    };
    Workspace.prototype.show_root = function() {
      var searchbar;
      window.recipesview = new RecipesView(recipes);
      recipesview.render();
      $(".main").html(recipesview.$el);
      searchbar = new SearchBarView;
      return searchbar.render();
    };
    Workspace.prototype.recipe = function(r) {
      var recipeview, searchbar;
      recipeview = new RecipeView(recipes.get(r));
      recipeview.render();
      $(".main").html(recipeview.$el);
      searchbar = new SearchBarView;
      return searchbar.render();
    };
    Workspace.prototype.edit_recipe = function(r) {
      var recipeview;
      recipeview = new RecipeView(recipes.get(r));
      recipeview.edit();
      $(".main").html(recipeview.$el);
      return $('#tags').tagsInput({
        'height': '35px',
        'width': '600px',
        'defaultText': ''
      });
    };
    Workspace.prototype.make_new = function() {
      var recipeview;
      recipeview = new RecipeView();
      recipeview.edit();
      $(".main").html(recipeview.$el);
      return $('#tags').tagsInput({
        'height': '35px',
        'width': '600px',
        'defaultText': ''
      });
    };
    return Workspace;
  })();
  window.app = new Workspace();
  Backbone.history.start({
    pushState: true
  });
  window.tagbar = new TagBarView(tags);
  window.recipeview = new RecipeView(recipes.models[0]);
  tagbar.render();
  recipeview.render();
}).call(this);
