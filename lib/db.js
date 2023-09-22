const mysql = require('mysql2');


const pool = mysql.createConnection({
	connectionLimit: 5,
	host: 'bf8pdofghs5dakuq9dwl-mysql.services.clever-cloud.com',
	user: 'uu5f0avbqckl327q',
	database: 'bf8pdofghs5dakuq9dwl',
	password: '6J1880YEeUxzpytKh5A9'
	// host: process.env.DB_HOST,
	// user: process.env.DB_USERNAME,
	// database: process.env.DB_DBNAME,
	// password: process.env.DB_PASSWORD
});


const queryForCatalog = "SELECT * FROM products";

exports.catalog = (req, res) => {
	pool.query(queryForCatalog, (err, data) => {
		let filter = new Array();
		for (let elem of data) {
			filter.push(elem.manufacturer);
		}

		if (err) return console.log(err);
		res.render('catalog', {
			layout: 'catalog',
			products: JSON.stringify(data),
			filter: new Set(filter)
		});
	});
};
