const mysql = require('mysql2');

const pool = mysql.createConnection({
	connectionLimit: 5,
	host: '127.0.0.1',
	user: 'root',
	database: 'apteka',
	password: ''
});

const queryForCatalog = "SELECT image, name, description, country, manufacturer, price FROM products JOIN manufacturers ON (products.manufacturer_id = manufacturers.id)";
const queryForMedicines = "SELECT image, name, description, country, manufacturer, price FROM products JOIN manufacturers ON (products.manufacturer_id = manufacturers.id) WHERE type = 1";
const queryForSupplements = "SELECT image, name, description, country, manufacturer, price FROM products JOIN manufacturers ON (products.manufacturer_id = manufacturers.id) WHERE type = 2";
const queryForDesinfection = "SELECT image, name, description, country, manufacturer, price FROM products JOIN manufacturers ON (products.manufacturer_id = manufacturers.id) WHERE type = 3";


createPool(queryForCatalog, 'catalog')
createPool(queryForMedicines, 'medicines')
createPool(queryForDesinfection, 'disinfection')
createPool(queryForSupplements, 'supplements')

function createPool(query, page) {
	exports[page] = (req, res) => {
		pool.query(query, (err, data) => {
			let filter = new Array();
			for (let elem of data) {
				filter.push(elem.manufacturer);
			}
	
			if (err) return console.log(err);
			res.render(page, {
				products: JSON.stringify(data),
				filter: new Set(filter)
			});
		});
	};
}