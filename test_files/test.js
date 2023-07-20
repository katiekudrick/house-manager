const fetch = require('node-fetch');
const url = 'http://localhost:5000/';

// for api add_item && /use_item endpoints
function postRequest(url, requestObject) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestObject)
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(error => console.error(error));
}

// for api /get_item/<item_id> && /get_all_items endpoints
function getRequest(url, query) {
  const options = {
    method: 'GET'
  };

  let queryString = ""

  for (key in query) {
    if (queryString === "") {
      queryString += "?"
    } else {
      queryString += "&"
    }
    queryString += key + "=" + query[key]
  }

  fetch(url + queryString, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(error => console.error(error));
}

// --------------------------------------------------------------------------

// test case function for add_item endpoint
function testAddItem(item) {
  postRequest(url + "add_item", item)
}

// test case function for use_item endpoint
function testUseItem(logged_item){
  postRequest(url + "use_item", logged_item)
}

// test case function for get_item endpoint
function testGetItem(item_id) {
  getRequest(url + "get_item/" + item_id)
}

// test case function for get_all_items endpoint
function testGetAllItems(query) {
  getRequest(url + "get_all_items", query)
}

// --------------------------------------------------------------------------

// happy test case for /add_item test POST
let test_add_item_good = {
  category: "Sports Bras",
  name: "Longline Racerback Sports Bra",
  description: "Black, Old Navy, Medium Support",
  cost: "15",
  purchase_date: "12-30-22"
}
testAddItem(test_add_item_good)

// happy test case for /use_item test POST
let test_use_item_good = {
  item_id: "ea734a93-cfde-4a0f-a051-dffa99ce4a54",
  use_date: "01-15-23"
}
testUseItem(test_use_item_good)

// happy test case for /get_item/<item_id> GET
let test_get_item_good = "ea734a93-cfde-4a0f-a051-dffa99ce4a54"
testGetItem(test_get_item_good)

// happy test case for /get_all_items GET
let test_get_all_items_good = {
  category: "Sports Bras",
  index: 0,
  count: 10
}
testGetAllItems(test_get_all_items_good)

// --------------------------------------------------------------------------

// error test case for missing category for add_item
let test_add_item_no_category = {
  name: "Longline Racerback Sports Bra",
  description: "Black, Old Navy, Medium Support",
  cost: "15",
  purchase_date: "12-30-22"
}
testAddItem(test_add_item_no_category)

// error test case for missing name for add_item
let test_add_item_no_name = {
  category: "Sports Bras",
  description: "Black, Old Navy, Medium Support",
  cost: "15",
  purchase_date: "12-30-22"
}
testAddItem(test_add_item_no_name)

// error test case for missing description for add_item
let test_add_item_no_description = {
  category: "Sports Bras",
  name: "Longline Racerback Sports Bra",
  cost: "15",
  purchase_date: "12-30-22"
}
testAddItem(test_add_item_no_description)

// error test case for missing cost for add_item
let test_add_item_no_cost = {
  category: "Sports Bras",
  name: "Longline Racerback Sports Bra",
  description: "Black, Old Navy, Medium Support",
  purchase_date: "12-30-22"
}
testAddItem(test_add_item_no_cost)

// error test case for missing purchase_date for add_item
let test_add_item_no_purchase_date = {
  category: "Sports Bras",
  name: "Longline Racerback Sports Bra",
  description: "Black, Old Navy, Medium Support",
  cost: "15"
}
testAddItem(test_add_item_no_purchase_date)

// error test case for missing category and cost for add_item 
let test_add_item_bad = {
  name: "Longline Racerback Sports Bra",
  description: "Black, Old Navy, Medium Support",
  purchase_date: "12-30-22"
}
testAddItem(test_add_item_bad)

// error test case for missing item_id for use_item
let test_use_item_no_item_id = {
  use_date: "01-15-23"
}
testUseItem(test_use_item_no_item_id)

// error test case for missing use_date for use_item
let test_use_item_no_use_date = {
  item_id: "ea734a93-cfde-4a0f-a051-dffa99ce4a54"
}
testUseItem(test_use_item_no_use_date)

// error test case for non-existant item_id for /get_item/<item_id> 
let test_get_item_bad = "0l1v3r-5ucK5"
testGetItem(test_get_item_bad)

// error test for /get_all_items, index passes letter
let test_get_all_items_bad_index_letter = {
  category: "Sports Bras",
  index: "a",
  count: 10
}
testGetAllItems(test_get_all_items_bad_index_letter)

// error test for /get_all_items, count passes letter
let test_get_all_items_bad_count_letter = {
  category: "Sports Bras",
  index: 0,
  count: 10
}
testGetAllItems(test_get_all_items_bad_count_letter)

// error test for /get_all_items, category missing
let test_get_all_items_no_category = {
  index: 0,
  count: 10
}
testGetAllItems(test_get_all_items_no_category)

// error test for /get_all_items, index missing
let test_get_all_items_no_index = {
  category: "Sports Bras",
  count: 10
}
testGetAllItems(test_get_all_items_no_index)

// error test for /get_all_items, count missing
let test_get_all_items_no_count = {
  category: "Sports Bras",
  index: 0
}
testGetAllItems(test_get_all_items_no_count)