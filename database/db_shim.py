import memory_db

# set of functions that the backend calls
# this will either then call memory-db.py or sqlite-db.py
# ------------------------------------------------

# /add_item: add one new record to table
def add_item(item_id, category, type, description, vendor, cost, purchase_date):
   pass

# /use_item: 
def use_item(item_id, use_date):
    pass
    

# ------------------------------------------------

# /get_item/{item_id}: query database for one item_id
def get_item(item_id):
   pass

# /get_all_items: query database and return all records
def get_all_items(category):
    pass

# /get_categories: 
def get_categories(category):
    pass   

# ------------------------------------------------

# update record
def update_item(item_id, category, type, description, vendor, cost, purchase_date):
    pass

# delete record from table
def delete_item(item_id):
   pass



