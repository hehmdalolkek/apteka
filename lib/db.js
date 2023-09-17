const mysql = require('mysql2');

const pool = mysql.createConnection({
	// connectionLimit: 5,
	// host: 'bf8pdofghs5dakuq9dwl-mysql.services.clever-cloud.com',
	// user: 'uu5f0avbqckl327q',
	// database: 'bf8pdofghs5dakuq9dwl',
	// password: '6J1880YEeUxzpytKh5A9'
	connectionLimit: 5,
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	database: process.env.DB_DBNAME,
	password: process.env.DB_PASSWORD
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