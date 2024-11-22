const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
require('dotenv').config();
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
const User = require('./routes/userrouter');
const Books = require('./routes/book');
const Favourite = require('./routes/favourite');
const Cart = require('./routes/cart');
const Order = require('./routes/order');


const connection = async() => {
    try{
        await mongoose.connect('mongodb+srv://sarojsingh9672:3r1RHnd6Ao6V3yH1@cluster0.7tjae.mongodb.net/bookstore');
        console.log('Connected to mongodb database')
    }
    catch(error){
        console.log(error);
    }
};
connection();
//user routes
app.use('/userapi', User);
//books
app.use('/booksapi', Books);
//favourites
app.use('/favouriteapi', Favourite);
//cart
app.use('/cart', Cart);
//order
app.use('/orders', Order);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});