# database models for a grocery store backend using Flask and SQLAlchemy
# This code defines the database models for a grocery store backend using Flask and SQLAlchemy.
# It includes models for User, Product, and Order, each with their respective fields and relationships.

from app import db

# the user model represents a user in the system, with fields for id, email, and password.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)




# the product model represents a product in the grocery store, with fields for id, name, price, and image_url.
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)


# the cart model represents a shopping cart in the grocery store, with fields for id, user_id, product_id, and quantity.

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    def __repr__(self):
        return f'<Cart user_id={self.user_id} product_id={self.product_id} quantity={self.quantity}>'


# the class model represent an order in the grocery store with fields for id, user_id, total_amount, and payment_status.
# It also establishes a relationship with the User model, indicating that each order is associated with a user.
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    total_amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.String(50), default="Pending")
    tx_ref = db.Column(db.String(100), unique=True, nullable=True)