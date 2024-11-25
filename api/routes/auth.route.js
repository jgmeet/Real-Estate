import express from 'express'
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import errorHandeler from '../utils/error.js';
import jwt from 'jsonwebtoken'
import verifyToken from "../utils/verifyToken.js";


const router = express.Router();

router.get('/sign-out', (req, res, next) => {
    console.log('inside server')

    try {
        res.clearCookie('token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
})

router.delete('/delete/:id', verifyToken, async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only delete your own account!'));
    }
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('token');
        res.status(200).json('User has been deleted!');

    } catch (error) {
        next(error);
    }
})

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

router.post('/sign-in', async (req, res, next) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user) return next(errorHandeler(404, 'User not found!'))

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) return next(errorHandeler(401, 'Email or password is not matching!'))

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;

        return res.cookie('token', token, {httpOnly: true}).status(200).json(rest)
    }
    catch(err) {
        return next(err)
    }
})

router.post('/google', async (req, res, next) => {
    const {name, email} = req.body;

    try {
        const user = await User.findOne({email})

        if (user) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          const { password: pass, ...rest } = user._doc;
          res
            .cookie('token', token, { httpOnly: true })
            .status(200)
            .json(rest);
            
        }
        else {
          const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

          const generatedUsername = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)

          const newUser = new User({ username: generatedUsername, email, password: hashedPassword});

          await newUser.save();

          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

          const { password: pass, ...rest } = newUser._doc;
          res.cookie('token', token, { httpOnly: true }).status(200).json(rest);
          
        }
      } catch (error) {
        next(error)
      }
})

export default router;