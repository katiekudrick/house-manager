# db_mode = "memory"
db_mode = "sqlite"

if db_mode == "memory":
    import memory_db as chosen_db
else:
    import sqlite_db as chosen_db

# set of functions that the backend calls
# this will either then call memory-db.py or sqlite-db.py
# ------------------------------------------------
# 1/30: currently returns pass through layer to chosen_db.py but soon will support other db options

# /add_item: add one new record to table
def add_item(item_id, category, type, description, vendor, cost, purchase_date):
   return chosen_db.add_item(item_id, category, type, description, vendor, cost, purchase_date)

# /use_item: 
def use_item(item_id, use_date):
    return chosen_db.use_item(item_id, use_date)
    

# ------------------------------------------------

# /get_item/{item_id}: query database for one item_id
def get_item(item_id):
   return chosen_db.get_item(item_id)

# /get_all_items: query database and return all records
def get_all_items(category):
    return chosen_db.get_all_items(category)

# /get_categories: 
def get_categories():
    return chosen_db.get_categories()   

# ------------------------------------------------

# update record
def update_item(item_id, category, type, description, vendor, cost, purchase_date):
    pass

# delete record from table
def delete_item(item_id):
   pass


#TODO: write sql functions that implements each one
