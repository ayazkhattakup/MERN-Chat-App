const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");


const router = express.Router();


router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});

const upload = multer({storage: storage});

router.post('/register', upload.single('profilePicture'), async (req, res) => {
    const {name, email, password, profilePictur} = req.body;
    console.log(profilePictur);
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicture = req.file ? req.file.filename : null;

    
    try {
        const user = await User.findOne({email:email});
        if (user) { 
            res.status(400).json({message:'User already exists'});
        } else {
            const newUser = new User({
                name:name,
                email:email,
                password:hashedPassword,
                profilePicture:profilePicture,
            });

            await newUser.save();
            res.status(201).json({message:'User account created successfully'});   
        };
    } catch(err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) return res.status(400).json({message:'Bad request'});

    const user = await User.findOne({email:email});

    if(!user) return res.status(404).json({message: "Invalid credentials"});

    const passwordValid = await bcrypt.compare(password, user.password);

    if(!passwordValid) res.status(404).json({message:"Invalid credentials"});

    const token = jwt.sign({email, id: user._id}, 'secret_key', {expiresIn: '12h'});
    return res.status(200).json({token});

})

module.exports = router;