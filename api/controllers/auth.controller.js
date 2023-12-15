import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../utils/error.js'
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashPassword });
    try {

        await newUser.save();
        res.status(201).json("user created successfully")
    }
    catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) return next(errorhandler(404, 'User Not Found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorhandler(401, 'Wrong Credentials'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
        const { password: pass, ...restUserInfo } = validUser._doc; // removing the password 

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(restUserInfo)
        // res
        // .cookie('access_token', token,{ httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60) }) 
        // .status(200)
        // .json(validUser)


    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
            const { password: pass, ...restUserInfo } = user._doc; // removing the password 

            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(restUserInfo)
        } else {
            const generatePassword = Math.random().toString(36).split(-8) + Math.random().toString(36).split(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).split(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo })
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
            const { password: pass, ...restUserInfo } = newUser._doc; // removing the password 

            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(restUserInfo)
        }

    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been succesfully logged out!')
        
    } catch (error) {
        next(error);
    }
}