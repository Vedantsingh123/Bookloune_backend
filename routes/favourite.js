const router = require('express').Router();
const User = require('../models/usermodel');

//add books to favourite
router.put('/add-book-to-favourite', async(req, res) => {
try{
    const{bookid ,id} = req.headers;
    const userData = await User.findById(id);
    const isbookfavourite = userData.favourites.includes(bookid);
    if(isbookfavourite){
        return res.status(200).json({message: 'book already is in favourites'});
    }
    await User.findByIdAndUpdate(id, {$push: {favourites: bookid}});
    return res.status(200).json({message: 'book added to favourites'});
}
catch(error){
    res.status(500).json({message: 'internal server error'});
}
});
//remove book from favourites
router.put('/remove-book-from-favourite', async(req, res) => {
    try{
        const{bookid ,id} = req.headers;
        const userdata = await User.findById(id);
        const isbookfavourite = userdata.favourites.includes(bookid);
        if(isbookfavourite){
            await User.findByIdAndUpdate(id, {$pull: {favourites: bookid}});
        }
        return res.status(200).json({message: 'book removed from favourites'});
    }
    catch(error){
        res.status(500).json({message: 'internal server error'});
    }
});
// get favourites book of particular user 
router.get('/get-favourite-books', async(req, res) => {
    try{
const id = req.headers.id;
const userData = await User.findById(id).populate("favourites");
const favouriteBooks = userData.favourites;
return res.json({
    status: 'success',
    data: favouriteBooks,
});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'An error occurred'});
    }
});
module.exports = router;