import sqlite3

INVENTORY_CREATE = """
        CREATE TABLE inventory (
            item_id text PRIMARY KEY,
            category text NOT NULL,
            type text NOT NULL,
            description text NOT NULL,
            vendor text NOT NULL,
            cost text NOT NULL,
            purchase_date text NOT NULL
        )
"""

USES_CREATE = """
        CREATE TABLE uses (
            use_id integer PRIMARY KEY,
            item_id text NOT NULL,
            use_date text NOT NULL,
            FOREIGN KEY (item_id) REFERENCES inventory (item_id)
        )
"""

def create_tables():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(INVENTORY_CREATE)
    
    cursor.execute(USES_CREATE)
    
    conn.commit()
    conn.close()

create_tables()