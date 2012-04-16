(function() {
  var Recipe, RecipeView, Recipes, RecipesView, Tag, TagBarView, Tags, Workspace;
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
      return this.id = this.get("title").toLowerCase().replace(/\ /, "-");
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
      "click #editRecipe": "edit",
      "click #cancelEdit": "render",
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
    RecipeView.prototype.save = function() {
      return console.log("Save me!");
    };
    RecipeView.prototype.make_view = function() {
      var editbtn, heading, ingredients, instructions;
      editbtn = "<div class='btn edit-btn' id='editRecipe'>Edit</div>";
      heading = "<h1>" + (this.recipe.get("title")) + "</h1>";
      ingredients = "<div class='ingredients'>							<h2>Ingredients</h2>							" + (this.recipe.get("ingredients")) + "						</div>";
      instructions = "<div class='instructions'>					      <h2>Instructions</h2>					      " + (this.recipe.get("instructions")) + "					    </div>";
      return "<div id='recipe' class='recipe'>" + editbtn + heading + ingredients + instructions + "</div>";
    };
    RecipeView.prototype.make_editable = function() {
      var editbtn, heading, ingredients, instructions;
      editbtn = "<div class='btn btn-primary save-btn' id='saveEdits'>Save</div> 						 <div class='btn cancel-btn' id='cancelEdit'>Cancel</div>";
      heading = "<input type='text' class='recipe-title' name='title' value='" + (this.recipe.get("title")) + "'></input>";
      ingredients = "<div class='ingredients'>							<h2>Ingredients</h2>							<textarea>" + (this.recipe.get("ingredients").replace(/<br>/g, '\n')) + "</textarea>						</div>";
      instructions = "<div class='instructions'>					      <h2>Instructions</h2>					      <textarea>" + (this.recipe.get("instructions").replace(/<br>/g, '\n')) + "</textarea>					    </div>";
      return "<div id='recipe' class='recipe'>" + editbtn + heading + ingredients + instructions + "</div>";
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
      "click .recipe": "showRecipe"
    };
    RecipesView.prototype.initialize = function() {
      this.recipes = this.options.models;
      this.$el.removeAttr("ingredients");
      this.$el.removeAttr("title");
      this.$el.removeAttr("instructions");
      return this.$el.removeAttr("tags");
    };
    RecipesView.prototype.render = function() {
      var r, ret;
      ret = ((function() {
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
    return RecipesView;
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
      this.recipe = __bind(this.recipe, this);
      this.show_root = __bind(this.show_root, this);
      Workspace.__super__.constructor.apply(this, arguments);
    }
    Workspace.prototype.routes = {
      '': "show_root",
      "new": "make_new",
      ":r": "recipe"
    };
    Workspace.prototype.show_root = function() {
      window.recipesview = new RecipesView(recipes);
      recipesview.render();
      return $(".main").html(recipesview.$el);
    };
    Workspace.prototype.recipe = function(r) {
      var recipeview;
      recipeview = new RecipeView(recipes.get(r));
      recipeview.render();
      return $(".main").html(recipeview.$el);
    };
    Workspace.prototype.make_new = function() {
      return console.log("newnew");
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
