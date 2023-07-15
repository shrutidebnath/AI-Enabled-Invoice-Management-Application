from flask import Flask, jsonify, request
from flask_cors import CORS

import util

app = Flask(__name__)
CORS(app)


@app.route('/get_price', methods=['POST'])
def get_price():
    RELEASED_CREDIT_VALUE = request.json['RELEASED_CREDIT_VALUE']
    ORDER_CURRENCY = request.json['ORDER_CURRENCY']
    CREDIT_STATUS = request.json['CREDIT_STATUS']
    ORDER_CREATION_DATE = request.json['ORDER_CREATION_DATE']
    REQUESTED_DELIVERY_DATE = request.json['REQUESTED_DELIVERY_DATE']
    CUSTOMER_NUMBER = request.json['CUSTOMER_NUMBER']
    PURCHASE_ORDER_TYPE = request.json['PURCHASE_ORDER_TYPE']
    SALES_ORG = request.json['SALES_ORG']
    COMPANY_CODE = request.json['COMPANY_CODE']
    response = jsonify({
        'price': util.predict_price(RELEASED_CREDIT_VALUE=RELEASED_CREDIT_VALUE,
                                    ORDER_CURRENCY=ORDER_CURRENCY,
                                    CREDIT_STATUS=CREDIT_STATUS,
                                    ORDER_CREATION_DATE=ORDER_CREATION_DATE,
                                    REQUESTED_DELIVERY_DATE=REQUESTED_DELIVERY_DATE,
                                    CUSTOMER_NUMBER=CUSTOMER_NUMBER,
                                    PURCHASE_ORDER_TYPE=PURCHASE_ORDER_TYPE,
                                    SALES_ORG=SALES_ORG,
                                    COMPANY_CODE=COMPANY_CODE)})
    return response


if __name__ == "__main__":
    print("Python server started")
    util.get_saved_artifacts()
    app.run()
