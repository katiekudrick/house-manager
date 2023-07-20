from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import uuid
import traceback


app = Flask(__name__)
cors = CORS(app)

app.debug = True

items = {
    # hard coded data for testing
    'test_item_01': {
        'category': 'Tops',
        'type': 'Racerback Tank',
        'description': 'Forest Green, Ribbed, Cropped',
        'vendor': 'Target',
        'cost': '5.99',
        'purchase_date': '2023-05-13',
        'use_records': []
    },
    'test_item_02': {
        'category': 'Bottoms',
        'type': 'Jeans',
        'description': 'Straight Leg, Ankle, High Rise, Medium Wash',
        'vendor': 'Gap',
        'cost': '35.99',
        'purchase_date': '2023-03-13',
        'use_records': []
    }
}


def create_errors(errors):
    errors_json = {'errors': errors}
    return (jsonify(errors_json), 400)

@app.route('/add_item', methods=['POST', 'OPTIONS'])
def add_item():
    if request.method == 'OPTIONS':
        # Handle the preflight request for CORS
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return ('', 200, headers)

    try:
        # get the request data
        data = request.get_json()

        print("/add_item args are %s"%(str(data)))

        # generate a unique item_id
        item_id = str(uuid.uuid4())

        required = ['category', 'type', 'description', 'vendor', 'cost', 'purchase_date']

        errors = []
        for field in required:
            if field not in data:
                errors.append('Missing ' + field)
        
        if errors:
            return create_errors(errors)

        # store the item data in the items dictionary
        items[item_id] = {
            'category': data['category'],
            'type': data['type'],
            'description': data['description'],
            'vendor': data['vendor'],
            'cost': data['cost'],
            'purchase_date': data['purchase_date'],
            'use_records': []
        }

        # return the item_id
        return jsonify({'item_id': item_id})
    except Exception as e:
        print("Exception occurred: %s" %(str(e)))
        traceback.print_exc()
        raise e


@app.route('/use_item', methods=['POST'])
def use_item():
    # get the request data
    data = request.get_json()

    print("/use_item args are %s"%(str(data)))

    required = ['item_id', 'use_date']

    errors = []
    for field in required:
        if field not in data:
            errors.append('Missing ' + field)
        
    if errors:
        return create_errors(errors)

    # get the item_id and use_date from the request data
    item_id = data['item_id']
    use_date = data['use_date']

    # check if the item exists
    if item_id not in items:
        return jsonify({'error': 'Item not found'}), 404

    # add the use record to the item's use_records list
    items[item_id]['use_records'].append(use_date)

    return jsonify({'message': 'Item ' + item_id + ' use recorded.'})


@app.route('/get_item/<item_id>', methods=['GET'])
def get_item(item_id):
    # check if the item_id exists
    if item_id not in items:
        return jsonify({'error': 'Item not found'}), 404

    print("/get_item arg is %s"%(item_id))

    # get the item data
    item = items[item_id]

    # return the item data
    return jsonify({
        'item_id': item_id,
        'category': item['category'],
        'type': item['type'],
        'description': item['description'],
        'vendor': item['vendor'],
        'cost': item['cost'],
        'purchase_date': item['purchase_date'],
        'use_records': item['use_records']
    })

@app.route('/get_all_items', methods=['GET'])
def get_all_items():
    try:
        errors = []

    
        required = ['category', 'index', 'count']
    
        # stage one of error checking
        args = {}
        for field in required:
           if not request.args.get(field):
               errors.append('Missing ' + field)
           else:
               args[field] = request.args.get(field)
        print("/get_all_items args are %s"%(str(args)))
    
        if errors:
            print("Returning errors: %s"%(errors))
            return create_errors(errors)
    
        # get the query parameters, stage two of error checking
        category = request.args.get('category')
        try:
            index = int(request.args.get('index'))
        except ValueError: 
            errors.append('index must be a number')
        try:
            count = int(request.args.get('count'))
        except ValueError: 
            errors.append('count must be a number')
    
        if errors:
            print("Returning errors: %s"%(errors))
            return create_errors(errors)
    
        # filter the items by category
        if category != 'all':
            filtered_items = {
                item_id: item for item_id, item in items.items()
                if item['category'] == category
            }
        else:
            filtered_items = items
    
        # sort the items by purchase date
        sorted_items = sorted( filtered_items.values(), key=lambda item: item['purchase_date'])
    
        # get the items at the specified index
        item_ids = [
            item_id for item_id, item in filtered_items.items()
                if sorted_items.index(item) >= index
                and sorted_items.index(item) < index + count
        ]

        print("item_ids = %s"%(str(item_ids)))
    
        # return the item_ids
        return jsonify({'item_ids': item_ids})
    except Exception as e:
        print("Exception occurred: %s" %(str(e)))
        traceback.print_exc()
        raise e

@app.route('/get_categories', methods=['GET'])
def get_categories():
    print(items)
    
    categories=[]


    for item_id in items:
        print(items[item_id])   
        category = items[item_id]["category"]
        
        if category not in categories:
            categories.append(category)
            
    

    print("categories = %s"%(str(categories)))

    # return categories
    return jsonify(categories)


if __name__ == '__main__':
    app.run(port=3000)


