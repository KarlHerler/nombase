from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def landing():
	return render_template('nombase.html', state="")

@app.route('/recipe/<r>')
def recipe(r):
	return render_template('nombase.html', state=("/recipe/"+r))


if __name__ == "__main__":
	app.run()