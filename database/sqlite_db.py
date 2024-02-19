import sqlite3

db_path = 'database/database.db'
# ------------------------------------------------

# /add_item: add one new record to table
def add_item(item_id, category, type, description, vendor, cost, purchase_date):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO inventory (item_id, category, type, description, vendor, cost, purchase_date) VALUES (?,?,?,?,?,?,?)",(item_id, category, type, description, vendor, cost, purchase_date))
        print("Alert: item_id " + item_id + " added to inventory table")
        conn.commit()

    except sqlite3.Error as e:
        print("SQLite Exception: " + str(e))
    
    conn.close()

# /use_item: 
def use_item(item_id, use_date):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO uses (item_id, use_date) VALUES (?, ?)", (item_id, use_date))
        print("Alert: date " + use_date + " logged in uses table for item_id " + item_id)
        conn.commit()

    except sqlite3.Error as e:
        print("SQLite Exception: " + str(e))
    
    conn.close()

# ------------------------------------------------

# /get_item/{item_id}: query database for one item_id
def get_item(item_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute(("SELECT * FROM inventory WHERE item_id=?"), (item_id,))
        rows = cursor.fetchall()
        for row in rows:
            print(row)
        print("Alert: item_id " + item_id + " record found in inventory table")
        # TODO: return item
    except sqlite3.Error as e:
        print("SQLite Exception: " + str(e))

    conn.close()

# /get_all_items: query database and return all records
def get_all_items(category="all"):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        if category == "all":
            cursor.execute(("SELECT * FROM inventory"))
        else:
            cursor.execute(("SELECT * FROM inventory WHERE category=?"), (category,))

        items = cursor.fetchall()

        result = []

        for item in items:
            (item_id, item_category, item_type, description, vendor, cost, purchase_date) = item
            result.append({
                "item_id": item_id,
                "category": item_category,
                "type": item_type,
                "description": description,
                "vendor": vendor,
                "cost": cost,
                "purchase_date": purchase_date
            })
            print(item)

        print("*get_all_items request complete, end of item inventory *")
    except sqlite3.Error as e:
        print("SQLite Exception: " + str(e))
        result = None

    conn.close()
    return result

# /get_categories: 
def get_categories():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    categories = []

    try:
        cursor.execute("SELECT * FROM inventory")
        
        items = cursor.fetchall()
                
        for item in items:
            (item_id, category, type, description, vendor, cost, purchase_date) = item
            if category not in categories:
                categories.append(category)
            print(item)
        print("Alert: end of items from category request")

    except sqlite3.Error as e:
        print("SQLite Exception: " + str(e))
        raise Exception("category request failure")

    conn.close()
    return categories

# ------------------------------------------------

# update record
def update_item(item_id, category, type, description, vendor, cost, purchase_date):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        # get old data for item
        cursor.execute("BEGIN TRANSACTION")
        cursor.execute("SELECT * FROM inventory WHERE item_id=?", (item_id,))
        old_data = cursor.fetchone()
        if old_data == None:
            conn.rollback()
            raise Exception("item_id " + item_id + " does not exist")

        # update data for item
        cursor.execute("UPDATE inventory SET category=?, type=?, description=?, vendor=?, cost=?, purchase_date=? WHERE item_id=?", (category, type, description, vendor, cost, purchase_date, item_id))

        # get newly updated data for item
        cursor.execute("SELECT * FROM inventory WHERE item_id=?", (item_id,))
        new_data = cursor.fetchone()
        if new_data == None:
            conn.rollback()
            raise Exception("item_id " + item_id + " does not exist")
        conn.commit()

        print("Previous data item_id " + item_id + ": " + str(old_data))
        print("Updated data item_id " + item_id + ": " + str(new_data))

    except sqlite3.Error as e:
        conn.rollback()
        print("SQLite Exception: " + str(e))

    conn.close()

# delete record from table
def delete_item(item_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        # get item from inventory
        cursor.execute("BEGIN TRANSACTION")
        cursor.execute("SELECT * FROM inventory WHERE item_id=?", (item_id,))
        item = cursor.fetchone()
        if item == None:
            conn.rollback()
            raise Exception("item_id " + item_id + " does not exist")

        cursor.execute(("DELETE FROM inventory WHERE item_id=?"), (item_id,))
        print("Alert: successfully deleted from inventory table item_id " + item_id + ": " + str(item))

        cursor.execute("SELECT * FROM inventory WHERE item_id=?", (item_id,))
        item = cursor.fetchone()
        if item != None:
            conn.rollback()
            raise Exception("item_id " + item_id + " did not delete")

        conn.commit()

    except sqlite3.Error as e:
        conn.rollback()
        print("SQLite Exception: " + str(e)) 

    conn.close()



