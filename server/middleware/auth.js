import jwt from 'jsonwebtoken';

function auth(req, res, next) {
  const accessToken = req.cookies.jwt;

  if (!accessToken) {
    return res.status(403).send();
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    return res.status(401).send();
  }
}

export default auth;
