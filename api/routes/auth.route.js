import express from 'express'
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

const router = express.Router();

router.post('/sign-up', async (req, res, next) => {
    const {username, email, password} = req.body

    // (password, salt value)
    const hashedPassowrd = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassowrd})

    try {
        await newUser.save();
        res.status(201).json(`${username} created successfully`)
    }
    catch(err) {
        next(err)
    }
})

export default router;