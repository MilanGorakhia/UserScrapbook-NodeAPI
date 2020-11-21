import  express from 'express';
const appcors = require('cors');
import bodyParser from'body-parser';
const morgan = require('morgan');

import App from './API/api';
//const approuter = require('./Controller/App');

const app: express.Application = express();

app.use(appcors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
//new dbcontext();
app.use(morgan('combined'))

app.use('/', App);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
