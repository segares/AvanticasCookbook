import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import router from './routes/api/index.js';

import { checkIfRecipeSchemaExist } from './controllers/recipeController.js';
import config from './config.js';

const app = express();
const { port } = config.app;

app.use(cors({ origin: true, credentials: true }));
app.use('/api', router);
dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  checkIfRecipeSchemaExist();
});

export default app;
