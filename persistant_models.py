import os                                                       #to access environment vars
from sqlalchemy import create_engine                            #db engine
from sqlalchemy.orm import sessionmaker                         #db session
from sqlalchemy.ext.declarative import declarative_base         #base class for relationships or something
from sqlalchemy import Column, Integer, String, ForeignKey      #database declaration stuffs
from sqlalchemy.orm import relationship, backref                #relationship stuff
from sqlalchemy.exc import IntegrityError                       #Database integrity error


## SETUP ##
if os.environ.get('DATABASE_URL'):
    engine = create_engine(os.environ.get('DATABASE_URL'), echo=True)
else:
    from sqlite3 import dbapi2 as sqlite
    engine = create_engine('sqlite+pysqlite:///file.db', module=sqlite)

Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()


## CLASSES ##

# Represents a single Recipe
# Attributes:   id(str)
#               title(str), 
#               ingredients(str),  
#               instructions(str)
#               tags(Tag)
class Recipe(Base):
    __tablename__ = 'recipe'
    id =            Column(String(128), primary_key=True)
    title =         Column(String)
    ingredients =   Column(String)
    instructions =  Column(String)
    tags =          relationship("Tag", backref="recipe")

    def to_dict(self): 
        return {
            'id': self.id,
            'title': self.title,
            'ingredients': self.ingredients,
            'instructions': self.instructions,
            'tags': [t.to_dict() for t in self.tags]
        }
    def __repr__(self): 
        return "{'id':'%s', 'title':'%s','ingredients':'%s', 'instructions':'%s', 'tags':%s}" % (self.id, self.title, self.ingredients, self.instructions, self.tags)


# Represents a Tag
# Attributes:   Name(str),
#               Stemmed(str)

class Tag(Base):
    __tablename__ = 'tag'
    id =            Column(Integer, primary_key=True)
    name =          Column(String)
    recipe_id =     Column(String, ForeignKey('recipe.id'))
    def to_dict(self):
        return { 'name': self.name }
    def __repr__(self): return "'"+str(self.name)+"'"


## INTERFACE CLASS ##
class Storage:
    def recipes(self):
        return session.query(Recipe).all()

    def tags(self):
        return [{'name': t.name } for t in session.query(Tag.name).distinct()]

    def add_recipe(self, title, ingredients, instructions, tags=None, id=None):
        if not id:
            id = title.lower().replace(" ", "-")
        
        tags_raw = tags
        r = Recipe(id=id, title=title, ingredients=ingredients, instructions=instructions)
        r.tags = [Tag(name=t) for t in tags]
        
        session.add(r)

        try: #Trying to store
            session.commit()
        except IntegrityError: #Already exists recipe with same id
            session.rollback()
            id = self.generate_new_id(id)
            self.add_recipe(title, ingredients, instructions, tags_raw, id)
        finally:
            r.id=id
            return r 




    def update_recipe(self, title, ingredients, instructions, tags, id):
        recipe = session.query(Recipe).filter(Recipe.id == id).one()
        recipe.title = title
        recipe.ingredients = ingredients
        recipe.instructions = instructions
        recipe.tags = [Tag(name=t) for t in tags]
        session.commit()
        return recipe
        
    def generate_new_id(self, id):
        id_construct = id.split("-")
        try: #Trying to find numeral at the end (in case serval of the same exists)
            ordinal = int(id_construct[len(id_construct)-1])
        except ValueError: #No numeral (first duplicate)
            id_construct.append("")
            ordinal = 0
        id_construct[len(id_construct)-1] = str(ordinal + 1)
        print '-'.join(id_construct)
        return '-'.join(id_construct)
            


## POST SETUP ##
Base.metadata.create_all(engine)

#internal_storage = Storage()
#internal_storage.add_recipe("Chicken Pizza", "A pie<br>A pizza", "Throw away the pie.<br>Eat the pizza", "[Baking,Meat,Italian]")
#internal_storage.add_recipe("Pie", "A pie<br>2dl flour", "Throw away the flour.<br>Eat the pie.", "[Baking,Meat]")
#internal_storage.add_recipe("Cake", "A pie<br>2dl flour", "Throw away the flour.<br>Eat the pie.", "[Baking,Meat]")
#internal_storage.add_recipe("Chocolate", "A pie<br>2dl flour", "Throw away the flour.<br>Eat the pie.", "[Baking,Meat]")
#internal_storage.add_recipe("Salsa", "A pie<br>2dl flour", "Throw away the flour.<br>Eat the pie.", "[Baking,Meat]")
#internal_storage.add_recipe("Rizza", "A pie<br>2dl flour", "Throw away the flour.<br>Eat the pie.", "[Baking,Meat]")
#internal_storage.add_recipe("Fizza", "A pie<br>2dl flour", "Throw away the flour.<br>Eat the pie.", "[Baking,Meat]")
#internal_storage.add_recipe("Bizza", "A pie<br>2dl flour", "Throw away the flour.<br>Eat the pie.", "[Baking,Meat]")
#internal_storage.add_recipe("Dizza", "A pie<br>2dl flour", "Throw away the flour.<br>Eat the pie.", "[Baking,Meat]")

#pizza = Recipe(id="pizza", title="Pizza", ingredients="A pie<br>A pizza", instructions="Throw away the pie.<br>Eat the pizza")
#pizza.tags = [Tag(name="Baking"), Tag(name="Meat"), Tag(name="Italian")]

#pie = Recipe(id="pie", title="Pie", ingredients="A pie<br>2dl flour", instructions="Throw away the flour.<br>Eat the pie.")
#pie.tags = [Tag(name="Baking"), Tag(name="Meat")]

#session.add(pizza)
#session.add(pie)
#session.commit()

