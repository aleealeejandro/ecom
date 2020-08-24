const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
require('dotenv').config()

//IMPORT ROUTES///////////
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')

// APP ///////////////////
const app = express()

// DATABASE //////////////
mongoose
	.connect(
		process.env.MONGO_URI,
		{useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true}
	)
	.then(() => console.log('DB connected'))

mongoose.connection.on('error', err => {
	console.log(`DB connection error: ${err.message}`)
});

// MIDDLEWARES////////////
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// ROUTES MIDDLEWARE//////
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Ecommerce Server has started`);
});
