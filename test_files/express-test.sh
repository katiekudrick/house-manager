# To run in command line from House_Manager_07-19-23 directory: ./test_files/express-test.sh

# /get_all_items test GET
curl -D GET "localhost:3000/get_all_items?category=clothes&index=0&count=10"

# ERROR /add_item test POST 
curl -H "Content-Type: application/json" -X POST -d "{}" localhost:3000/add_item

# /add_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Bras\", \"type\": \"Longline Racerback Sports Bra\", \"description\": \"Black, Medium Support\", \"vendor\": \"Old Navy\", \"cost\": \"15.99\", \"purchase_date\": \"12-30-22\"}" localhost:3000/add_item

# /use_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"item_id\": \"test_item_01\", \"use_date\": \"05-15-23\"}" localhost:3000/use_item

# ERROR test case for item_id that doesn't exist
curl -H "Content-Type: application/json" -X POST -d "{\"item_id\": \"no_mas_01\", \"use_date\": \"05-15-23\"}" localhost:3000/use_item

# ERROR test case for missing item_id for use_item
curl -H "Content-Type: application/json" -X POST -d "{\"use_date\": \"01-17-23\"}" localhost:3000/use_item

# /get_item/:item_id GET
curl -D GET "localhost:3000/get_item/test_item_01"

# ERROR test case for /get_item/:item_id GET
curl -D GET "localhost:3000/get_item/no_mas_01"

# /get_categories test GET
curl -D GET "localhost:3000/get_categories"

# /get_all_items test GET
curl -D GET "localhost:3000/get_all_items?category=Tops&index=0&count=10"