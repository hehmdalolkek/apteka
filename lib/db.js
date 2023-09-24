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
})


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

exports.edit = (req, res) => {
	const id = req.params.id;
	pool.query('SELECT * FROM products WHERE id=?', [id], (err, data) => {
		if (err) return console.log(err);
		res.render('edit', {
			layout: 'edit',
			product: data[0]
		});
	});
};

exports.editPost = (req, res) => {
	if(!req.body) return res.sendStatus(400);

	const id = req.body.id;
  const image = req.body.image;
  const name = req.body.name;
  const description = req.body.description;
  const manufacturer = req.body.manufacturer;
  const country = req.body.country;
  const price = req.body.price;

	pool.query("UPDATE products SET image=?, name=?, description=?, manufacturer=?, country=?, price=? WHERE id=?", [image, name, description, manufacturer, country, price, id], (err, data) => {
		if(err) return console.log(err);
    res.redirect("/catalog");
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	pool.query('DELETE FROM products WHERE id=?', [id], (err, data) => {
		if (err) return console.log(err);
		res.redirect('/catalog');
	});
};

exports.create = (req, res) => {
	res.render('create', {
		layout: 'edit'
	})
};

exports.createPost = (req, res) => {
	if(!req.body) return res.sendStatus(400);

	const image = req.body.image;
  const name = req.body.name;
  const description = req.body.description;
  const manufacturer = req.body.manufacturer;
  const country = req.body.country;
  const price = req.body.price;

	pool.query("INSERT INTO products VALUES (NULL, ?, ?, ?, ?, ?, ?)", [image, name, description, manufacturer, country, price], (err, data) => {
		if(err) return console.log(err);
    res.redirect("/catalog");
	});
};