const router = require('express').Router();
const User = require('../models/usermodel');

//add books to cart
router.put('/add-book-to-cart', async(req, res) => {
    try{
        const{bookid ,id} = req.headers;
        const userData = await User.findById(id);
        const isbookincart = userData.cart.includes(bookid);
        if(isbookincart){
            return res.status(200).json({message: 'book already is in cart'});
        }
        await User.findByIdAndUpdate(id, {$push: {cart: bookid}});
        return res.status(200).json({message: 'book added to cart'});
    }
    catch(error){
        res.status(500).json({message: 'internal server error'});
    }
    });
// remove book from cart
router.put('/remove-book-from-cart', async(req, res) => {
    try{
        const{bookid ,id} = req.headers;
        const userdata = await User.findById(id);
        const isbookincart = userdata.cart.includes(bookid);
        if(isbookincart){
            await User.findByIdAndUpdate(id, {$pull: {cart: bookid}});
        }
        return res.status(200).json({message: 'book removed from cart'});
    }
    catch(error){
        res.status(500).json({message: 'internal server error'});
    }
});
// get cart of  particular user
router.get('/get-user-cart', async(req, res) => {
    try{
const id = req.headers.id;
const userData = await User.findById(id).populate("cart");
const cart = userData.cart.reverse();
return res.json({
    status: 'success',
    data: cart,
});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'An error occurred'});
    }
});
module.exports = router;