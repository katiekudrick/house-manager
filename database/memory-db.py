import sqlite3

# ------------------------------------------------

# /add_item: add one new record to table
def add_item(item_id, category, type, description, vendor, cost, purchase_date):
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

# /use_item: 
def use_item(item_id, use_date):
    items[item_id]['use_records'].append(use_date)
    

# ------------------------------------------------

# /get_item/{item_id}: query database for one item_id
def get_item(item_id):
   # get the item data
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



