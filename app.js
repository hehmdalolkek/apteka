const port = process.env.PORT || 3000;
const express = require('express');
const expressHandlebars = require('express-handlebars');
const urlencodedParser = express.urlencoded({extended: false});
const handlers = require('./lib/handlers');
const db = require('./lib/db');

const app = express();
app.engine('handlebars', expressHandlebars.engine({
	defaultLayout: 'main',
	helpers: {
		section: function(name, options) {
		if(!this._sections) {
			this._sections = {};
		}
		this._sections[name] = options.fn(this);
		return null;
		},
	},
}));
app.set('view engine', 'handlebars');
app.disable('x-powered-by');

app.use(express.static(__dirname + '/public'));
app.get('/', handlers.index);
app.get('/catalog', db.catalog);
app.get('/create', db.create);
app.post('/create', urlencodedParser, db.createPost);
app.get('/edit/:id', db.edit);
app.post('/edit/:id', urlencodedParser, db.editPost);
app.post('/delete/:id', db.delete);
app.use(handlers.notFound);
app.use(handlers.serverError);

if (require.main === module) {
	app.listen(port, () => {
		console.log(`сервер запущен на http://localhost:${port}`);
	})
} else {
	module.exports = app;
}