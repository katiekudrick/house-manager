// https://gist.github.com/thegitfather/9c9f1a927cd57df14a59c268f118ce86


const url = 'http://127.0.0.1:3000/';


// call api /get_item/ endpoint
// !!item_id must be a number string!!
async function getDetailedItem(item_id) {
  const request = url + "get_item/" + item_id;
  const options = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };

  let response = await fetch(request, options);
  let json = await response.json();

  console.log("getRequestString(" + request + ") returned json = " + JSON.stringify(json));
  console.log("Fetching: " + request + " || Response Status: " + response.status);
  return json 
};

// ---------------------------------------------------------------------------------------------

// call api /get_all_items endpoint
// !!query must be a json object!!
async function getAllItemsinCategory(query) {
  let queryString = "";
// TODO: harden query string to escape special charaters. look for helper functions
  for (let key in query) {
    if (queryString === "") {
      queryString += "?"
    } else {
      queryString += "&"
    }
    queryString += key + "=" + query[key]
  }

  const request = url + "get_all_items" + queryString;
  const options = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };

  let response = await fetch(request, options)
  let json = await response.json();

  console.log("Fetching: " + request + " || Response Status: " + response.status)

  return json 
};

// call api /get_categories endpoint
const category_dropdown = document.getElementById("table-dropdown");
const view_now_btn = document.getElementById("view-category");
const show_category = document.getElementById("displayed-category");

var requested_category_view = async function(event) {
  event.preventDefault();
  const select = category_dropdown.value;

// TODO: FIGURE OUT COUNT. NEED TO USE getAllItemsinCategory() FOR LENGTH THEN IF LOOP?

  var query = {
    'category': select,
    'index': 0,
    'count': 10
  };

  if (select == "all") {
    show_category.innerText = "Current Category View: All";
    await getAllItemsinCategory(query).then(async function() {
      generateFetchedItemsTable(query);
    });
  } else {
    show_category.innerText = `Current Category View: ${select.charAt(0).toUpperCase()}${select.slice(1)}`;
    await getAllItemsinCategory(query).then(function() {
      generateFetchedItemsTable(query);
    });
  }
};

view_now_btn.addEventListener("click", requested_category_view);

// ---------------------------------------------------------------------------------------------

// Used this documentation as guidance: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces

async function generateFetchedItemsTable(query) {
  // creates variable with json of fetched items per category request
  var items = await getAllItemsinCategory(query);
  console.log(items);

  // interacting with hard coded html tags
  var grabTable = document.getElementById("all-items-table");
  var grabTableBody = document.getElementById("rows-all-items");

  // clear existing table rows
  grabTableBody.innerHTML = '';

  // create table cells via javascript
  for (var i = 0; i < items.item_ids.length; i++) {
    // creates variable with json of details of each item_id in items
    var items_with_info = await getDetailedItem(items.item_ids[i]);

    // create <tr> html tags
    var createTableRows = document.createElement("tr");
    createTableRows.setAttribute("id", items.item_ids[i]);

    // match the item_id key in items_with_info to its corresponding <tr> id
    var matchKey = items_with_info.keyToMatch;

    // get the keys in the order they appear in the test data
    var keys = [
      "item_id",
      "category",
      "type",
      "description",
      "vendor",
      "cost",
      "purchase_date",
      "use_records",
    ];

    // generate cell text & insert
    for (var j= 0; j < keys.length; j++) {
      var key = keys[j];
      if (items_with_info.hasOwnProperty(key)) {
        // create <td> html tags
        var createTableCell = document.createElement("td");
        // create text from json object by noding <td> contents
        var cellText;
        if (key === "use_records" && Array.isArray(items_with_info[key])) {
          var viewButton = document.createElement("button");
          viewButton.textContent = "View Records";
          // add event listener to button to show alert
          // create a closure to capture the value of items_with_info for each iteration
          (function (item) {
            viewButton.addEventListener("click", function() {
              loadPopUpWindow(item.item_id);
            });
          })(items_with_info);
          createTableCell.appendChild(viewButton);
        } else {
          cellText = document.createTextNode(items_with_info[key]);
          // insert <td> into <tr>
          createTableCell.appendChild(cellText);
        }
        // insert <tr> into <tbody>
        createTableRows.appendChild(createTableCell);
      }
    }
    
    // add a button cell to the row for logging the date of use
    var logCell = document.createElement("td");
    var logButton = document.createElement("button");

    logButton.innerText = "Log Item Use";
    logButton.onclick = logUseHandler(items_with_info.item_id);
    logCell.appendChild(logButton);
    createTableRows.appendChild(logCell);
    
    // find the <tr> element with the matching id & append the row to it
    var matchingRow = document.getElementById(matchKey);
    if (matchingRow) {
      matchingRow.appendChild(createTableRows);
    } else {
      // if no matching row is found, add the row to the end of the table body
      grabTableBody.appendChild(createTableRows);
    }
  }
  // put the <tbody> in the <table>
  grabTable.appendChild(grabTableBody);
  // appends <table> into <body>
  document.body.appendChild(grabTable);
  grabTable.setAttribute("border", "2");

  // create a separate function to capture the correct value of items_with_info
  function logUseHandler(itemId) {
    return function () {
      logItemUse(itemId);
    };
  }

  // function to log date of use
  async function logItemUse(itemId) {
    var useDate = prompt("Enter date of item usage (yyyy-mm-dd):", new Date().toISOString().slice(0,10));
  
    // validate the date
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!useDate.match(dateRegex)) {
      alert("Invalid date format. Please enter date in yyyy-mm-dd format.");
      return;
    }
  
    // create request data object
    var requestData = {
      "item_id": itemId,
      "use_date": useDate
    };
  
    // make the API request to update item's use_records
    try {
      const request = url + "use_item";
      const options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestData)
      };
      let response = await fetch(request, options);
      const data = await response.json();
      console.log(data.message);
  
      // update the items dictionary in memory
      if (items[itemId]) {
        items[itemId].use_records.push(useDate);
        console.log("Item " + itemId + " used on date: " + useDate + "; item record updated.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

// ---------------------------------------------------------------------------------------------

// pop-up triggered by view record button click
async function loadPopUpWindow(id_from_view_btn) {
  var itemUseToView = await getDetailedItem(id_from_view_btn)

  // Calculate the product age in days
  var purchaseDate = new Date(itemUseToView.purchase_date);
  var currentDate = new Date();
  var timeDiff = currentDate.getTime() - purchaseDate.getTime();
  var productAgeInDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  var numLoggedUses = itemUseToView.use_records.length;
  var costPerUse = (itemUseToView.cost / numLoggedUses).toFixed(2);

  // Create the pop-up container and its content
  var popup = document.createElement("div");
  popup.classList.add("pop-up");

  var popupContent = document.createElement("div");
  popupContent.classList.add("pop-up-content");

  var heading = document.createElement("h2");
  heading.textContent = itemUseToView.name;

  var subHeading = document.createElement("p");
  subHeading.classList.add("sub-heading");
  subHeading.textContent = itemUseToView.description;

  var itemId = document.createElement("p");
  itemId.classList.add("item-id");
  itemId.textContent = "Item ID: " + itemUseToView.item_id;

  var closeButton = document.createElement("span");
  closeButton.classList.add("close-btn");
  closeButton.innerHTML = "&times;";
  closeButton.onclick = function() {
    popup.style.display = "none";
  };

  var price = document.createElement("p");
  price.innerHTML = "Purchase Price: $" + itemUseToView.cost;

  // Create a new element to display the usage dates
  var usageDatesList = document.createElement("ul");

  // Iterate over each usage date and create a list item element for each date
  itemUseToView.use_records.forEach(function(date) {
    var listItem = document.createElement("li");
    listItem.textContent = date;
    usageDatesList.appendChild(listItem);
  });

  // Create a label for the usage dates
  var usageDatesLabel = document.createElement("p");
  usageDatesLabel.textContent = "Usage Dates:";

  var loggedUsesInfo = document.createElement("p");
  loggedUsesInfo.innerHTML = "# of Logged Uses: " + numLoggedUses;

  // Create a new element to display the product age
  var productAgeInfo = document.createElement("p");
  productAgeInfo.innerHTML = "Product Age: " + productAgeInDays + " Days";

  var costPerUseInfo = document.createElement("p");
  costPerUseInfo.innerHTML = "Cost Per Use: $" + costPerUse;

  // Add the content to the pop-up container
  popupContent.appendChild(closeButton);
  popupContent.appendChild(heading);
  popupContent.appendChild(subHeading);
  popupContent.appendChild(itemId);
  popupContent.appendChild(price);
  popup.appendChild(popupContent);
  popupContent.appendChild(usageDatesLabel);
  popupContent.appendChild(usageDatesList);
  popupContent.appendChild(loggedUsesInfo);
  popupContent.appendChild(productAgeInfo);
  popupContent.appendChild(costPerUseInfo);

  // Add the pop-up to the document
  document.body.appendChild(popup);

  // Make the pop-up visible
  popup.style.display = "block";
};

// ---------------------------------------------------------------------------------------------

// tutorial used for reference: https://www.w3schools.com/howto/howto_js_popup.asp
// pop-up /add_item screen (html modal boxes)
var pop_up = document.getElementById("add-item-screen");
var add_item_btn = document.getElementById("add-item-btn");
var span = document.getElementsByClassName("close-btn")[0];

// click add_item_btn, open pop-up screen
add_item_btn.onclick = function() {
  pop_up.style.display = "block";
}

// click (x) to close pop-up
span.onclick = function() {
  pop_up.style.display = "none";
}

// user clicks anywhere outside of the modal, closes pop-up screen
window.onclick = function(event) {
  if (event.target == pop_up) {
    pop_up.style.display = "none";
  }
}

// post api /add_item endpoint
const add_form = document.getElementById("form-add-item");
const add_category = document.querySelector("#add-item-cat");
const add_type = document.querySelector("#add-item-type");
const add_description = document.querySelector("#add-item-desc");
const add_vendor = document.querySelector("#add-item-vendor");
const add_cost = document.querySelector("#add-item-cost");
const add_date = document.querySelector("#add-item-date");
const success_message = document.getElementById("success-message");

add_form.addEventListener("submit", async function(event){
  event.preventDefault();

  const newItem = {
    'category': add_category.value,
    'type': add_type.value,
    'description': add_description.value,
    'vendor': add_vendor.value,
    'cost': add_cost.value,
    'purchase_date': add_date.value,
  }
  const request = url + "add_item";
  const options = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    allow: 'POST, GET, HEAD, PUT',
    body: JSON.stringify(newItem)
  };

  const response = await fetch(request, options);

  const data = await response.json();
  console.log("Added New Item: " + JSON.stringify(data))

  // show success message and refresh form
  success_message.innerText = "New item added to your personal inventory!";
  add_form.reset();
  setTimeout(() => {
    success_message.innerText = "";
  }, 3000);

});
