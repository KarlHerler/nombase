#Nombase
A recipe database for delicious, delicious open source food. A demo exists on: http://nombase.herokuapp.com/


##Requirements
Python 2.6 or newer
A SQL database, defaults to SQLite for development, Postgres for production.

##Dependencies
Flask
Jinja
SQLAlchemy


##Installation
1. Clone this repositiory, either using `git clone https://github.com/KarlHerler/nombase` or by downloading a zipball
2. Install the required files using `pip install -r requirements.txt
3. Run using the command `python server.py`

##Deploying to heroku
I've set this project up to be deployable on heroku (ceder) as is so just go ahead. You should note that you need to add the free heroku postgres database (or the other postgres databses), using for instance `heroku addons:add shared-database`.

##Todo
- Tags support
- Search support
- Support for pictures of food.
- Adding a new recipe should not force a page refresh.