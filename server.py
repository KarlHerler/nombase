import os

from persistant_models import Storage

import json

from flask import Flask
from flask import render_template
from flask import request
app = Flask(__name__)


s = Storage()

@app.route('/')
def landing():
	tags = s.tags()
	recipes = s.recipes()
	
	return render_template('nombase.html', state="", tags=tags, recipes=recipes)

@app.route('/', methods=['POST'])
def new_recipe():
	recipe = request.json
	recipe = s.add_recipe(recipe[unicode("title")], recipe[unicode("ingredients")], 
						  recipe[unicode("instructions")], recipe[unicode("tags")])
	print recipe
	return json.dumps(str(recipe))

@app.route('/<r>', methods=['GET'])
def recipe(r):
	tags = s.tags()
	recipes = s.recipes()
	return render_template('nombase.html', state=("/"+r), tags=tags, recipes=recipes)


@app.route('/<r>', methods=['PUT'])
def mod_recipe(r):
	recipe = request.json
	recipe = s.update_recipe(recipe[unicode("title")], recipe[unicode("ingredients")], 
							 recipe[unicode("instructions")], recipe[unicode("tags")], 
							 recipe[unicode("id")])
	return json.dumps(str(recipe))
	

@app.route('/<r>/edit')
def edit_recipe(r):
	tags = s.tags()
	recipes = s.recipes()
	
	return render_template('nombase.html', state=("/"+r+"/edit"), tags=tags, recipes=recipes)


if __name__ == "__main__":
	 # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    #app.debug = True
    app.run(host='0.0.0.0', port=port)