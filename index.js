const express = require('express');
const app = express();
const { port } = require('./config/environment');
const expressLayouts  = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('home'));

app.listen(port, () => console.log(`Express is listening on port ${port}`));
