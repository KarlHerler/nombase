#Nombase
A recipe database for your delicious, delicious open source food. A demo exists 
on: http://nombase.herokuapp.com/.

There is somewhat further documentation in the various folders.


##Requirements
-  Python 2.6 or newer
-  A SQL database, defaults to SQLite for development, Postgres for production.

##Dependencies
-  Flask
-  Jinja
-  SQLAlchemy


##Installation
1. Clone this repositiory, either using `git clone https://github.com/KarlHerler/nombase` or by downloading a zipball
2. Install the required files using `pip install -r requirements.txt`
3. Run using the command `python server.py`

##Deploying to heroku
I've set this project up to be deployable on heroku (ceder) as is so just go 
ahead. You should note that you need to add the free heroku postgres database 
(or the other postgres databases), using for instance `heroku addons:add shared-database`.

##Todo
- Search support
- Support for pictures of food.
- Adding a new recipe should not force a page refresh.
- Organize code a bit better, refractor.
- Cleanup and in code documentation.


##Contributing
Really any help or anything at all you can or feel like doing is appreciated. If 
you find any bugs or anything that seems out of the ordinary, feel free to report an issue.