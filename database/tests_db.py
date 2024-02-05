import sqlite_db as database


item_id = "test-item-add-use"

use_date = "2023-03-07"

category = "Top"

database.add_item(item_id, category, "Sweatshirt", "2XL Oversized Gray Midnights Hoodie", "Etsy", "21.99", "2022-10-21")

database.add_item("test-item-update", category, "Tank Top", "XL Black", "Target", "5.99", "2023-12-07")

database.add_item("test-item-delete", category, "Sweater", "XL Camel Turtleneck, Loose Fit", "Amazon", "31.99", "2021-11-18")


database.use_item(item_id, use_date)

database.get_item(item_id)

database.get_all_items()

database.get_categories(category)



database.update_item("test-item-update", category, "High Neck Racerback Cropped Tank Top", "XL Black", "Target", "5.99", "2023-12-07")

database.delete_item("test-item-delete")
database.get_all_items()