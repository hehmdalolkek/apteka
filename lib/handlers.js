exports.index = (req, res) => res.render('index');

exports.indexPost = (req, res) => {
	const password = req.body.password;
	
	if (password === '123') {
		return res.redirect('/catalog');
	}

	return res.redirect('/');
};

exports.notFound = (req, res) => res.render('404');

exports.serverError = (err, req, res, next) => { res.render('500'); console.log(err); };