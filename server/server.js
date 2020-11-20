import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import fileStore from 'session-file-store';
import cors from 'cors';
import router from './routes/api/index.js';
import config from './config.js';
import auth from './middleware/auth.js';

const app = express();
const { port } = config.app;
const file_store = fileStore(session);

app.use(cors());
app.use('/api', router);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.set('views', path.join(path.resolve(), 'views'));
app.set('view engine', 'pug');

app.use(
  session({
    name: 'session-id',
    secret: '123456xxx',
    saveUninitialized: false,
    resave: false,
    store: new file_store(),
  }),
);

const unless = function (path, middleware) {
  return function (req, res, next) {
    if (path === req.path) {
      return next();
    }
    return middleware(req, res, next);
  };
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
