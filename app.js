const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();
const product = require('./routes/product.route');

let db_url = 'mongodb://mirrAR1:mirrAR1@ds251877.mlab.com:51877/mirrar_product';
const mongoDB = process.env.MONGODB_URI || db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine','ejs')

app.get('/',(req,res)=>{
	res.render('index');
})
app.use('/products',product)

app.listen(process.env.PORT || 5000)