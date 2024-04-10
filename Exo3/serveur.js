'use strict';

let express = require('express');
let app = express();
app.use('/', express.static('public'));
app.listen(8080);

let api = require('./api/api');
app.use('/api/', api);