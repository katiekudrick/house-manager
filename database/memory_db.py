import sqlite3

# ------------------------------------------------
# TODO: Before we get too far into the weeds, can we map out which files will connect and the order of how they talk to each other? I'm starting to get confused and would like something to reference on my own.
# TODO: update readme file to run command line integrations tests files
# TODO: notes file describing everything 

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

# /add_item: add one new record to table
def add_item(item_id, category, type, description, vendor, cost, purchase_date):
    # TODO: Jim, how are we going forward with ID generation?

    # store the item data in the items dictionary
    items[item_id] = {
        'category': category,
        'type': type,
        'description': description,
        'vendor': vendor,
        'cost': cost,
        'purchase_date': purchase_date,
        'use_records': []
    }

    return item_id

# /use_item: 
def use_item(item_id, use_date):
    # TODO: Jim, please look at the variables. Do I need to rename them due to the args?

    items[item_id]['use_records'].append(use_date)

    message = print('Message: Recorded %s use on %s' % (str(item_id), str(use_date)))

    return message
    

# ------------------------------------------------

# /get_item/{item_id}: query database for one item_id
def get_item(item_id):
   # get the item data

    if item_id not in items:
        return None

    item = items[item_id]

    return item 

# /get_all_items: query database and return all records
def get_all_items(category):
    # filter the items by category
    if category != 'all':
        filtered_items = {
            item_id: item for item_id, item in items.items()
            if item['category'] == category
        }
    else:
        filtered_items = items
        
    return filtered_items

# /get_categories: 
def get_categories(category):

    categories=[]

    for item_id in items:
        print(items[item_id])   
        category = items[item_id]["category"]
        
        if category not in categories:
            categories.append(category)

    return categories    

# ------------------------------------------------

# update record
def update_item(item_id, category, type, description, vendor, cost, purchase_date):
    pass

# delete record from table
def delete_item(item_id):
   pass



