const router = require('express').Router();
const User = require('../models/usermodel');

// Sign-Up Route
router.post('/Sign-Up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check length of username
        if (username.length < 4) {
            return res.status(400).json({ message: 'Username length should be greater than 3 characters' });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check password length
        if (password.length <= 5) {
            return res.status(400).json({ message: 'Password length must be greater than 5 characters' });
        }

        // Create and save new user
        const newUser = new User({
            username,
            email,
            password, // Store password in plaintext (not recommended)
            address
        });
        await newUser.save();

        return res.status(201).json({ message: 'Sign-Up successful' });
    } catch (error) {
        console.error('Error during Sign-Up:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Sign-In Route
router.post('/Sign-In', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the provided password matches the stored password (plaintext comparison)
        if (password !== existingUser.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Successful sign-in
        return res.status(200).json({
            message: 'Sign-In successful',
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                address: existingUser.address,
                role: existingUser.role
            }
        });
    } catch (error) {
        console.error('Error during Sign-In:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

//get user informatiom
router.get('/userinformation', async(req, res) => {
    try{
    const id = req.headers.id;
    const user = await User.findById(id);
    return res.status(200).json(user);
    }
    catch(error){
       res.status(500).json({message: 'Internal server error'});
    }
});

//update address
router.put('/updateaddress', async (req, res) => {
try{
 const id = req.headers.id;
 const address = req.body.address;
 await User.findByIdAndUpdate(id, {address: address});
 res.status(200).json({message:'address updated successfully'})
}
catch(error){
    res.status(500).json({message: 'Internal server error'})
}
});
module.exports = router;