function auth(req, res, next) {
    console.log("SESSION NAME: "+ req.session.user)
    if (!req.session.user) {
        res.render('login');
    } 
    next();
}

function auth2(req, res, next) {
    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            res.render('login');
        }
    } else {
        res.render('login');
    }
    next();
}

module.exports = auth;