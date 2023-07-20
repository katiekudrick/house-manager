from flask import Flask, request, jsonify
import uuid

app = Flask(__name__)

items = {}

@app.route('/add_item', methods=['POST'])
def add_item():
    # get the request data
    data = request.get_json()

    # generate a unique item_id
    item_id = str(uuid.uuid4())

    # store the item data in the items dictionary
    items[item_id] = {
        'category': data['category'],
        'name': data['name'],
        'description': data['description'],
        'cost': data['cost'],
        'purchase_date': data['purchase_date'],
        'use_records': []
    }

    # return the item_id
    return jsonify({'item_id': item_id})


@app.route('/use_item', methods=['POST'])
def use_item():
    # get the request data
    data = request.get_json()

    # get the item_id and use_date from the request data
    item_id = data['item_id']
    use_date = data['use_date']

    # check if the item exists
    if item_id not in items:
        return jsonify({'error': 'Item not found'}), 404

    # add the use record to the item's use_records list
    items[item_id]['use_records'].append(use_date)

    return jsonify({'message': 'Item used'})


@app.route('/get_item/<item_id>', methods=['GET'])
def get_item(item_id):
    # check if the item exists
    if item_id not in items:
        return jsonify({'error': 'Item not found'}), 404

    # get the item data
    item = items[item_id]

    # return the item data
    return jsonify({
        'item_id': item_id,
        'category': item['category'],
        'name': item['name'],
        'description': item['description'],
        'cost': item['cost'],
        'purchase_date': item['purchase_date'],
        'use_records': item['use_records']
    })

@app.route('/get_all_items', methods=['GET'])
def get_all_items():
    # get the query parameters
    category = request.args.get('category')
    index = int(request.args.get('index'))
    count = int(request.args.get('count'))

    # filter the items by category
    if category:
        filtered_items = {
            item_id: item for item_id, item in items.items()
            if item['category'] == category
        }
    else:
        filtered_items = items

    # sort the items by purchase date
    sorted_items = sorted(
        filtered_items.values(),
        key=lambda item: item['purchase_date']
    )

    # get the items at the specified index
    item_ids = [
        item_id for item_id, item in items.items()
        if sorted_items.index(item) >= index
        and sorted_items.index(item) < index + count
    ]

    # return the item_ids
    return jsonify({'item_ids': item_ids})


if __name__ == '__main__':
    app.run()
