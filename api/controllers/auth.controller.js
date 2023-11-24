import User from '../models/user.model.js'
import bcrptjs from 'bcryptjs'
import { errorhandler } from '../utils/error.js'
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashPassword = bcrptjs.hashSync(password, 10)
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

        const validPassword = bcrptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorhandler(401, 'Wrong Credentials'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
        const {password: pass, ...restUserInfo} = validUser._doc; // removing the password 

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