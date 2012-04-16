from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def landing():
	return render_template('nombase.html', state="")

@app.route('/<r>')
def recipe(r):
	return render_template('nombase.html', state=("/"+r))


if __name__ == "__main__":
	app.run()