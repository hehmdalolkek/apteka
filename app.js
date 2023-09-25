const express = require('express');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const handlers = require('./lib/handlers');
const db = require('./lib/db');



const port = process.env.PORT || 3000;
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
app.use(express.urlencoded({extended: true}));



app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: db.sessionStore,
	resave: false,
	saveUninitialized: false
}));

const isAuth = (req, res, next) => {
	if (req.session.isAuth) {
		next();
	} else {
		return res.redirect('/');
	}
};



app.use(express.static(__dirname + '/public'));
app.get('/', handlers.index);
app.post('/', handlers.indexPost);
app.get('/catalog', isAuth, db.catalog);
app.get('/create', isAuth, db.create);
app.post('/create', isAuth, db.createPost);
app.get('/edit/:id', isAuth, db.edit);
app.post('/edit/:id', isAuth, db.editPost);
app.post('/delete/:id', isAuth, db.delete);
app.post('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) throw err;
		return res.redirect('/');
	});
});
app.use(handlers.notFound);
app.use(handlers.serverError);



if (require.main === module) {
	app.listen(port, () => {
		console.log(`сервер запущен на http://localhost:${port}`);
	})
} else {
	module.exports = app;
}