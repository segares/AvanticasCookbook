function auth(req, res, next) {
    console.log("SESSION NAME: "+ req.session.user)
    if (!req.session.user) {
        res.render('login');
    } 
    next();
}

export default auth;