const router = require('express').Router();
const User = require('../models/usermodel');
const Order = require('../models/userorder');
const Book = require('../models/book');

//placing order
router.post('/place-order', async(req, res) => {
try{
    const { id } = req.headers;
    const{ order } = req.body;
    for(const orderData of order){
        const newOrder = new Order({user: id,  book: orderData._id});
        const orderDataFromDb = await newOrder.save();
// save order in user model
await User.findByIdAndUpdate(id, {
    $push: {orders: orderDataFromDb._id}
});
//clear cart after order placed
await User.findByIdAndUpdate(id, {
    $pull: {cart: orderData._id}
});
}
return res.json({
    status: "success",
    message: "Order Placed Successfully",
})
}
catch(error){
    console.log(error);
    return res.status(500).json({message: 'An error occurred'});
}
});
//get order history of particular user
router.get('/get-order-history', async(req, res) =>{
    try{
        const { id }  = req.headers;
        const userData = await User.findById(id).populate({path: "orders",
            populate: {path: "book"},
        });
       
    
        const ordersData = userData.orders.reverse();
       
        return res.json({
            status: "success",
            data: ordersData,
    });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            status: "error",
            message: "An error occurred while fetching order history."
        });
    }
});
//get-all-order-admin
router.get('/get-all-orders', async(req, res) => {
 try{
    const userData = await Order.find().populate({
        path: "book",
    }).populate({
        path: "user",
    }).sort({createdAt: -1});
    return res.json({
        status: "success",
        data: userData,
    });
 }
 catch(error){
    console.log(error);
    return res.status(500).json({message: "An error occurred"});
 }
});
//update order by admin
router.put('/update-order-status/:id', async(req, res) => {
try{
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, {status: req.body.status});
    return res.json({
        status: "success",
        data: "order status updated",
    });
}
catch(error){
    console.log(error);
    return res.status(500).json({message: "An error occurred"});
}
});
module.exports = router;