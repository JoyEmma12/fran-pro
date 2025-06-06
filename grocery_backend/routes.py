from app import app, db
from models import User, Product, Order, Cart # Import necessary modules
from flask import request, jsonify  # Flask request and jsonify for handling requests and responses
import requests # requests for making HTTP requests to external APIs
import uuid # uuid for generating unique transaction references

FLW_SECRET_KEY = 'FLWSECK_TEST-244373600dc320a50c58e7909ec55df0-X'

# User Registration
@app.route('/register', methods=['POST']) # Define the route for user registration
def register_user():
    data = request.get_json()
    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email and password required"}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    new_user = User(email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully."})


# Get Products (with pagination, sorting, filtering)
@app.route('/products', methods=['GET'])
def get_products():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 8))
    tag = request.args.get('tag')
    sort = request.args.get('sort')  

    query = Product.query

    if tag:
        query = query.filter(Product.tag == tag)

    if sort == 'asc':
        query = query.order_by(Product.price.asc())
    elif sort == 'desc':
        query = query.order_by(Product.price.desc())

    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    products = [{
        'id': p.id,
        'name': p.name,
        'price': p.price,
        'image_url': p.image_url,
        'tag': p.tag
    } for p in paginated.items]

    return jsonify({
        'products': products,
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': paginated.page
    })


# Add Item to Cart (and store in DB)
@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data.get('user_id')
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    if not user_id or not product_id:
        return jsonify({"error": "User ID and Product ID are required"}), 400

    # Check if item already in cart, update quantity if so
    existing = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
    if existing:
        existing.quantity += quantity
    else:
        new_item = Cart(user_id=user_id, product_id=product_id, quantity=quantity)
        db.session.add(new_item)

    db.session.commit()
    return jsonify({"message": "Item added to cart"})


#  Create Order
@app.route('/order', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    total = data.get('total_amount')

    if not user_id or not total:
        return jsonify({'error': 'User ID and total amount are required'}), 400

    new_order = Order(user_id=user_id, total_amount=total)
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Order created. Proceed to payment.", "order_id": new_order.id})


# Start Flutterwave Payment
@app.route('/start-payment', methods=['POST'])
def start_payment():
    data = request.get_json()
    order_id = data.get('order_id')

    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    tx_ref = str(uuid.uuid4())
    order.tx_ref = tx_ref
    db.session.commit()

    payment_data = {
        "tx_ref": tx_ref,
        "amount": order.total_amount,
        "currency": "NGN",
        "redirect_url": "http://localhost:5000/flutterwave/verify",
        "payment_options": "card",
        "customer": {
            "email": data['email'],
            "phonenumber": data['phone'],
            "name": data['name']
        },
        "customizations": {
            "title": "Digital Grocery Payment",
            "description": "Payment for groceries",
        }
    }

    headers = {
        "Authorization": f"Bearer {FLW_SECRET_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post("https://api.flutterwave.com/v3/payments", json=payment_data, headers=headers)
    result = response.json()

    if result['status'] == 'success':
        return jsonify({"payment_link": result['data']['link'], "tx_ref": tx_ref})
    else:
        return jsonify({"error": "Payment initiation failed", "details": result}), 400


# Flutterwave Verify Route
@app.route('/flutterwave/verify', methods=['GET'])
def flutterwave_verify():
    transaction_id = request.args.get('transaction_id')
    if not transaction_id:
        return jsonify({'error': 'Transaction ID is required'}), 400

    url = f"https://api.flutterwave.com/v3/transactions/{transaction_id}/verify"
    headers = {
        "Authorization": f"Bearer {FLW_SECRET_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.get(url, headers=headers)
    result = response.json()

    if result['status'] == 'success' and result['data']['status'] == 'successful':
        tx_ref = result['data']['tx_ref']
        order = Order.query.filter_by(tx_ref=tx_ref).first()
        if not order:
            return jsonify({'error': 'Order not found'}), 404

        order.payment_status = 'paid'
        db.session.commit()
        return jsonify({'message': 'Payment verified and order marked as paid.'}), 200

    return jsonify({'error': 'Payment not successful', 'details': result}), 400
