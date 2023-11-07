import express, { json } from 'express';
import { randomBytes } from 'crypto';
import fs from 'fs';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

const app = express();
import cors from 'cors';
const port = 3000;
const file  = fs.readFileSync('./static/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use(json());
app.use(cors({ origin: '*' , credentials :  true}));
// Serve Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var items = {
    // hard coded data for testing purposes
    test_item_01: {
        category: 'Tops',
        type: 'Racerback Tank',
        description: 'Forest Green, Ribbed, Cropped',
        vendor: 'Target',
        cost: '5.99',
        purchase_date: '05-13-2023',
        use_records: []
    },
    test_item_02: {
        category: 'Bottoms',
        type: 'Jeans',
        description: 'Straight Leg, Ankle, High Rise, Medium Wash',
        vendor: 'Gap',
        cost: '35.99',
        purchase_date: '03-13-2023',
        use_records: []
    },
};

// helper item_id generator
function generateUniqueId() {
  return randomBytes(8).toString('hex');
}

// helper error function
function createErrors(res, errors) {
    const errorsJson = { "errors" : errors };
    return res.status(400).send(errorsJson);
}

// @app.route('/add_item', methods=['POST'])
app.post('/add_item', (req, res) => {
    console.log("/add_item called with args="+JSON.stringify(req.body))

    const data = req.body;
    const required = ['category', 'type', 'description', 'vendor', 'cost', 'purchase_date'];

    var errors = [];
    for (let field of required) {
        if (!(field in data)) {
            errors.push('Missing ' + field);
        }
    };

    if (errors.length > 0) {
        console.log('Error: ' + errors.join(', ')); // Log the errors
        createErrors(res, errors);
        return
    };

    const item_id = generateUniqueId();

    // store the item data in the items dictionary
    items[item_id] = {
        'category': data.category,
        'type': data.type,
        'description': data.description,
        'vendor': data.vendor,
        'cost': data.cost,
        'purchase_date': data.purchase_date,
        'use_records': []
    };

    console.log('New Item Added:', items[item_id]);

    res.json({'item_id': item_id});
})

// @app.route('/use_item', methods=['POST'])
app.post('/use_item', (req, res) => {
    console.log("/use_item called with args="+JSON.stringify(req.body))

    const data = req.body;
    const required = ['item_id', 'use_date'];

    var errors = [];
    for (let field of required) {
        if (!(field in data)) {
            errors.push('Missing ' + field);
        }
    };

    if (errors.length > 0) {
        console.log('Error: ' + errors.join(', ')); // Log the errors
        createErrors(res, errors);
        return
    };

    // get the item_id and use_date from the request data
    const item_id = data.item_id;
    const use_date = data.use_date;

    // check it the item exists
    if (!(item_id in items)) {
        return res.status(404).json({ error: 'Item not found.'});
    };

    // add the use record to the item's use_records list
    items[item_id]['use_records'].push(use_date);

    console.log('Item ' + item_id + ' used on ' + use_date);

    res.json({'message': 'Item ' + item_id + ' use recorded.'});
});

// @app.route('/get_item/<item_id>', methods=['GET'])
app.get('/get_item/:item_id', (req, res) => {
    const item_id = req.params.item_id;
    console.log("/get_item called with item_id="+item_id.toString())

    console.log('item_id = ' + item_id);

    // check if the item_id exists
    if (!(item_id in items)) {
        console.log('Error: Item ID ' + item_id + ' does not exist.'); // Log the error
        createErrors(res, ['Item ID ' + item_id + ' does not exist.']);
        return;
    };

    // get the item data
    var item = items[item_id];

    console.log('Feteched requested item ' + item_id + ': ' + JSON.stringify(item));

    return res.json({
        'item_id': item_id,
        'category': item.category,
        'type': item.type,
        'description': item.description, 
        'vendor': item.vendor, 
        'cost': item.cost, 
        'purchase_date': item.purchase_date, 
        'use_records': item.use_records
    });
});

// @app.route('/get_all_items', methods=['GET'])
app.get('/get_all_items', (req, res) => {
    console.log("/get_all_items called with args="+JSON.stringify(req.query))

    try {
        const errors = [];
        const required = ['category', 'index', 'count'];

        // stage one error check
        const args = {};
        for (const field of required) {
            if (!req.query[field]) {
                errors.push(`Missing ${field}`);
            } else {
                args[field] = req.query[field];
            }
        }
        console.log(`/get_all_items args are ${JSON.stringify(args)}`);

        if (errors.length > 0) {
            console.log(`Returning Errors: ${errors}`);
            return res.json(createErrors(errors));
        }

        // get query parameters & stage two error check
        const category = req.query.category;
        let index, count;
        try {
            index = parseInt(req.query.index);
        } catch (error) {
            errors.push('Index must be a number.');
        }
        try {
            count = parseInt(req.query.count);
        } catch (error) {
            errors.push('Count must be a number.');
        }

        if (errors.length > 0) {
            console.log(`Returning Errors: ${errors}`);
        }

        // filter items by category
        let filtered_items;
        if (category !== 'all') {
            filtered_items = Object.fromEntries(
                Object.entries(items).filter(
                    ([item_id, item]) => item['category'] === category
                )
            );
        } else {
            filtered_items = items;
        }

        // sort items by purchase_date
        const sorted_items = Object.entries(filtered_items)
        .sort(([, item1], [, item2]) => {
          const date1 = new Date(item1['purchase_date']);
          const date2 = new Date(item2['purchase_date']);
          return date1 - date2;
        })
        .map(([item_id, item]) => item);

        // get items at requested index
        const item_ids = sorted_items
        .map(item => {
            const item_id = Object.keys(filtered_items).find(
              key => filtered_items[key] === item
            );
            return item_id;
        })
        .slice(index, index + count);

        console.log(`item_ids = ${JSON.stringify(item_ids)}`);

        // return item_ids
        return res.json({ 'item_ids': item_ids });
    } catch (error) {
        console.log(`Exception Occurred: ${error}`);
        console.log(error.stack);
        throw error;
    }
});

// @app.route('/get_categories', methods=['GET'])
app.get('/get_categories', (req, res) => {
    console.log("/get_categories called with args="+JSON.stringify(req.query))

    var categories = [];

    for (var item_id in items) {
        console.log(items[item_id]);
        const category = items[item_id]["category"];

        if (!categories.includes(category)) {
            categories.push(category);
        }
    }

    console.log("categories = " + JSON.stringify(categories));
    res.json(categories);
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
