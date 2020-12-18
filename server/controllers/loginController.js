import jwt from 'jsonwebtoken';
import getUserByNameAndPassword from '../dal/loginDao.js';

let user = { userid: 0, username: '' };
export const getLoggedUser = () => user;

const validateUserCredentials = async (username, password) => {
  const result = await getUserByNameAndPassword(username, password);
  return result;
};

const validateLogin = async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const loginResult = await validateUserCredentials(username, password);
  if (loginResult.rowCount === 0) {
    return res.status(401).send();
  }
  user.userid = loginResult.rows[0].userid;
  user.username = username;
  console.log('CURRENT USER', user);

  const payload = { user };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  user.refreshToken = refreshToken;
  res.cookie('jwt', accessToken, {
    expires: new Date(Date.now() + 9999999),
    secure: false,
    httpOnly: false,
  });

  return res.send();
};

export default validateLogin;
