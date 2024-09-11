const express = require('express');
const env = require('dotenv');
const connectToDatabase = require('./Config/db');
const BodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
//Rest object
const app = express()

//configure env
env.config();

//Enable middleware
app.use(BodyParser.urlencoded({
    extended: true
}));




//routes
const userRoutes = require('./Routes/UserRoutes/userRoutes');
const cartRoutes = require('./Routes/UserRoutes/cartRoutes')

//adminRoutes
const adminRoutes = require('./Routes/AdminRoutes/adminRoutes');
const initialDataRoutes = require('./Routes/AdminRoutes/intialData');
const pageRoutes = require('./Routes/AdminRoutes/pageRoutes');
const addressRoutes = require('./Routes/UserRoutes/addressRoutes')

//Common routes
const categoryRoutes = require('./Routes/categoryRoutes');
const productRoutes = require('./Routes/productRoutes');


//Enable middleware
app.use(express.json())

//static file
app.use('/public', express.static(path.join(__dirname, "uploads")));

//Connect to database
connectToDatabase();

// app.use(cors());

//cors
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE",
}))


//User middleware routes
app.use('/api', userRoutes);
app.use('/api/cart', cartRoutes);

//admin middleware routes
app.use('/api/admin', adminRoutes);
app.use('/api/admin', initialDataRoutes);

//common middleware routes
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/address',addressRoutes)



//Port
console.log(process.env.PORT, "port");
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} stage on ${PORT}`);
});