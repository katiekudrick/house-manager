#!/bin/bash

# /add_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Sports Bras\", \"type\": \"Longline Racerback Sports Bra\", \"description\": \"Black, Medium Support\", \"vendor\": \"Target\", \"cost\": \"15.89\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# /use_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"item_id\": \"test_item_02\", \"use_date\": \"01-17-23\"}" localhost:5000/use_item

# /get_all_items test GET
curl -D GET "localhost:5000/get_all_items?category=clothes&index=0&count=10"

# /get_item/<item_id> GET
curl -D GET "localhost:5000/get_item/test_item_01"

# /get_all_categories test GET
curl -D GET "localhost:5000/get_all_categories"

# error test case for missing item_id for use_item
curl -H "Content-Type: application/json" -X POST -d "{\"use_date\": \"01-17-23\"}" localhost:5000/use_item

# error test case for missing use_date for use_item
curl -H "Content-Type: application/json" -X POST -d "{\"item_id\": \"test_item_02\"}" localhost:5000/use_item

# error test case for missing category for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"type\": \"Longline Racerback Sports Bra\", \"description\": \"Black, Medium Support\", \"vendor\": \"Target\", \"cost\": \"15.89\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing type for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Sports Bras\", \"description\": \"Black, Medium Support\", \"vendor\": \"Target\", \"cost\": \"15.89\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing description for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Sports Bras\", \"type\": \"Longline Racerback Sports Bra\", \"vendor\": \"Target\", \"cost\": \"15.89\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing vendor for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Sports Bras\", \"type\": \"Longline Racerback Sports Bra\", \"description\": \"Black, Medium Support\", \"cost\": \"15.89\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing cost for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Sports Bras\", \"type\": \"Longline Racerback Sports Bra\", \"description\": \"Black, Medium Support\", \"vendor\": \"Target\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing purchase_date for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Sports Bras\", \"type\": \"Longline Racerback Sports Bra\", \"description\": \"Black, Medium Support\", \"vendor\": \"Target\", \"cost\": \"15.89\"}" localhost:5000/add_item

# error test case for missing category, vendor and purchase_date for add_item 
curl -H "Content-Type: application/json" -X POST -d "{\"type\": \"Black Hoodie, Cropped\", \"description\": \"Black, Old Navy\", \"cost\": \"25\"}" localhost:5000/add_item

# error test case for non-existant item_id for /get_item/<item_id> 
curl -D GET "localhost:5000/get_item/80083"

# error test for /get_all_items, index passes letter
curl -D GET "localhost:5000/get_all_items?category=clothes&index=a&count=10"

# error test for /get_all_items, count passes letter
curl -D GET "localhost:5000/get_all_items?category=clothes&index=0&count=a"

# error test for /get_all_items, category missing
curl -D GET "localhost:5000/get_all_items?index=0&count=10"

# error test for /get_all_items, index missing
curl -D GET "localhost:5000/get_all_items?category=clothes&count=10"

# error test for /get_all_items, count missing
curl -D GET "localhost:5000/get_all_items?category=clothes&index=0"

# /get_all_categories test GET
curl -D GET "localhost:5000/get_categories"