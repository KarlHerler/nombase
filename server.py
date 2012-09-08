import os

from persistant_models import Storage

import json

from flask import Flask
from flask import render_template
from flask import request
app = Flask(__name__)


s = Storage()

@app.route('/')
def landing(): return render_site("")

@app.route('/<r>', methods=['GET'])
def recipe(r): return render_site("/"+r)

@app.route('/<r>/edit')
def edit_recipe(r): return render_site("/"+r+"/edit")


@app.route('/', methods=['POST'])
def new_recipe():
	recipe = request.json
	recipe = s.add_recipe(recipe[unicode("title")], recipe[unicode("ingredients")], 
						  recipe[unicode("instructions")], recipe[unicode("tags")])
	#print recipe
	return json.dumps(recipe.to_dict())


@app.route('/<r>', methods=['PUT'])
def mod_recipe(r):
	recipe = request.json
	recipe = s.update_recipe(recipe[unicode("title")], recipe[unicode("ingredients")], 
							 recipe[unicode("instructions")], recipe[unicode("tags")], 
							 recipe[unicode("id")])
	return json.dumps(recipe.to_dict())
	




def render_site(state):
	tags = [json.dumps(t) for t in s.tags()]
	recipes = json.dumps([r.to_dict() for r in s.recipes()])

	return render_template('nombase.html', state=state, tags=tags, recipes=recipes)

if __name__ == "__main__":
	 # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    #app.debug = True
    app.run(host='0.0.0.0', port=port)