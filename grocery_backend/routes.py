from app import app, db
from models import User, Product, Order
from flask import request, jsonify
import requests  # For making HTTP requests
import uuid  # For generating unique transaction references


# the code defines the api routes for a grocery store backend using Flask.
# It includes routes for user registration, product retrieval, and order creation.

# API route for user registration
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    new_user = User(email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully."})

# API route for product retrieval
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    output = []
    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'image_url': product.image_url
        }
        output.append(product_data)
    return jsonify(output)

# API route for order creation
@app.route('/order', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(user_id=data['user_id'], total_amount=data['total_amount'])
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Order created. Proceed to payment."})

# FLUTTERWAVE PAYMENT VERIFICATION ROUTE
FLW_SECRET_KEY = 'FLWSECK_TEST-244373600dc320a50c58e7909ec55df0-X'  

@app.route('/flutterwave/verify', methods=['GET'])
def flutterwave_verify():
    transaction_id = request.args.get('transaction_id')

# this line of code checks if transaction id is present or not
    if not transaction_id:
        return jsonify({'error': 'Transaction ID is required'}), 400

    #  Verify payment from Flutterwave API
    url = f"https://api.flutterwave.com/v3/transactions/{transaction_id}/verify"
    headers = {
        "Authorization": f"Bearer {FLW_SECRET_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.get(url, headers=headers)
    result = response.json()

    #  If payment was successful
    if result['status'] == 'success' and result['data']['status'] == 'successful':
        tx_ref = result['data']['tx_ref']

        #  Find the corresponding order using tx_ref
        order = Order.query.filter_by(tx_ref=tx_ref).first()

        if not order:
            return jsonify({'error': 'Order not found'}), 404

        #  Update order status
        order.payment_status = 'paid'
        db.session.commit()

        return jsonify({'message': 'Payment verified and order marked as paid.'}), 200

    return jsonify({'error': 'Payment not successful', 'details': result}), 400


# this code defines the API route for starting a payment using Flutterwave.

@app.route('/start-payment', methods=['POST'])
def start_payment():
    data = request.get_json()
    order_id = data.get('order_id')

    # Step 1: Find the order
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    # Step 2: Generate tx_ref and save it to the order
    tx_ref = str(uuid.uuid4())
    order.tx_ref = tx_ref
    db.session.commit()

    # Step 3: Prepare payment payload
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

    response = requests.post(
        "https://api.flutterwave.com/v3/payments",
        json=payment_data,
        headers=headers
    )

    result = response.json()

    if result['status'] == 'success':
        return jsonify({
            "payment_link": result['data']['link'],
            "tx_ref": tx_ref
        })
    else:
        return jsonify({
            "error": "Payment initiation failed",
            "details": result
        }), 400
