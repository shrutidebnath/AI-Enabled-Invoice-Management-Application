import json
import math
import pickle

import numpy as np
import pandas as pd

__model = None
__le_ORDER_CURRENCY = None
__le_order_month = None
__le_CUSTOMER_NUMBER = None
__le_PURCHASE_ORDER_TYPE = None
__columns = None
__customer_avg_dict = None
__order_type_avg_dict = None
__sales_avg_dict = None
__company_avg_dict = None
__days_dict = None


def predict_price(RELEASED_CREDIT_VALUE=0, ORDER_CURRENCY='USD', CREDIT_STATUS=0, ORDER_CREATION_DATE=20220102,
                  REQUESTED_DELIVERY_DATE=20220106, CUSTOMER_NUMBER=12311807, PURCHASE_ORDER_TYPE="1000", SALES_ORG=3537,
                  COMPANY_CODE=3220):

    RELEASED_CREDIT_VALUE = np.log(
        abs(RELEASED_CREDIT_VALUE)) if RELEASED_CREDIT_VALUE != 0 else 0.0
    try:
        ORDER_CURRENCY = int(
            __le_ORDER_CURRENCY.transform([ORDER_CURRENCY])[0])
    except:
        ORDER_CURRENCY = 'USD'
        ORDER_CURRENCY = int(
            __le_ORDER_CURRENCY.transform([ORDER_CURRENCY])[0])
    try:
        CREDIT_STATUS = np.log(
            abs(CREDIT_STATUS)) if CREDIT_STATUS != 0 else 0.0
    except:
        CREDIT_STATUS = 0
    try:
        ORDER_CREATION_DATE = pd.to_datetime(
            ORDER_CREATION_DATE, format="%Y%m%d")
    except:
        ORDER_CREATION_DATE = 20220102
        ORDER_CREATION_DATE = pd.to_datetime(
            ORDER_CREATION_DATE, format="%Y%m%d")
    try:
        REQUESTED_DELIVERY_DATE = pd.to_datetime(
            REQUESTED_DELIVERY_DATE, format="%Y%m%d")
    except:
        REQUESTED_DELIVERY_DATE = 20220106
        REQUESTED_DELIVERY_DATE = pd.to_datetime(
            REQUESTED_DELIVERY_DATE, format="%Y%m%d")
    try:
        order_month = int(__le_order_month.transform(
            [str(ORDER_CREATION_DATE.month)])[0])
    except:
        ORDER_CREATION_DATE = 20220102
        order_month = int(__le_order_month.transform(
            [str(ORDER_CREATION_DATE)])[0])
    delivery_duration = REQUESTED_DELIVERY_DATE - ORDER_CREATION_DATE
    delivery_duration = delivery_duration.total_seconds() / (24 * 60 * 60)
    x = [9.9] * (len(__columns))
    try:
        CUSTOMER_NUMBER = __le_CUSTOMER_NUMBER.transform([CUSTOMER_NUMBER])[0]
    except:
        CUSTOMER_NUMBER = 12311807
        CUSTOMER_NUMBER = __le_CUSTOMER_NUMBER.transform([CUSTOMER_NUMBER])[0]
    try:
        CUSTOMER_AVG = __customer_avg_dict[str(CUSTOMER_NUMBER)]
    except:
        CUSTOMER_AVG = 0
    try:
        PURCHASE_ORDER_TYPE = __le_PURCHASE_ORDER_TYPE.transform([PURCHASE_ORDER_TYPE])[
            0]
    except:
        PURCHASE_ORDER_TYPE = '1000'
        PURCHASE_ORDER_TYPE = __le_PURCHASE_ORDER_TYPE.transform([PURCHASE_ORDER_TYPE])[
            0]
    try:
        PURCHASE_ORDER_TYPE = __order_type_avg_dict[str(PURCHASE_ORDER_TYPE)]
    except:
        PURCHASE_ORDER_TYPE = 0
    try:
        SALES_ORG = __sales_avg_dict[str(SALES_ORG)]
    except:
        SALES_ORG = 0
    try:
        COMPANY_CODE = __company_avg_dict[str(COMPANY_CODE)]
    except:
        COMPANY_CODE = 0

    x[0] = RELEASED_CREDIT_VALUE
    x[1] = ORDER_CURRENCY
    x[2] = CREDIT_STATUS
    x[3] = order_month
    x[4] = delivery_duration
    for i in range(1, 8):
        col = 'Last-' + str(i) + 'day_Sales'
        val = __days_dict[col][str(CUSTOMER_NUMBER)]
        x[4+i] = val if not math.isnan(val) else 0.0

    x[12] = CUSTOMER_AVG
    x[13] = PURCHASE_ORDER_TYPE
    x[14] = SALES_ORG
    x[15] = COMPANY_CODE
    np_array = np.array(x)
    X_test_copy = pd.DataFrame([np_array], columns=__columns)

    return float(np.exp(__model.predict(X_test_copy)[0]))


def get_saved_artifacts():
    print("Getting saved artifacts")
    global __model
    global __le_ORDER_CURRENCY
    global __le_order_month
    global __le_CUSTOMER_NUMBER
    global __le_PURCHASE_ORDER_TYPE
    global __columns
    global __customer_avg_dict
    global __order_type_avg_dict
    global __sales_avg_dict
    global __company_avg_dict
    global __days_dict
    with open('./artifacts/model.pickle', 'rb') as file:
        __model = pickle.load(file)
    with open('./artifacts/encoders/CUSTOMER_NUMBER.pickle', 'rb') as file:
        __le_CUSTOMER_NUMBER = pickle.load(file)
    with open('./artifacts/encoders/PURCHASE_ORDER_TYPE.pickle', 'rb') as file:
        __le_PURCHASE_ORDER_TYPE = pickle.load(file)
    with open('./artifacts/encoders/ORDER_CURRENCY.pickle', 'rb') as file:
        __le_ORDER_CURRENCY = pickle.load(file)
    with open('./artifacts/encoders/order_month.pickle', 'rb') as file:
        __le_order_month = pickle.load(file)
    with open('./artifacts/dictionary/columns.json', 'r') as f:
        __columns = json.load(f)['data_columns']
    with open('./artifacts/dictionary/days_dict.json', 'r') as f:
        __days_dict = json.load(f)
    with open('./artifacts/dictionary/customer_avg.json', 'r') as f:
        __customer_avg_dict = json.load(f)
    with open('./artifacts/dictionary/order_type_avg.json', 'r') as f:
        __order_type_avg_dict = json.load(f)
    with open('./artifacts/dictionary/sales_avg.json', 'r') as f:
        __sales_avg_dict = json.load(f)
    with open('./artifacts/dictionary/company_avg.json', 'r') as f:
        __company_avg_dict = json.load(f)
    print("Artifact loading is complete")
