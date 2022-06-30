import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// @desc   Register user
// @route  POST api/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, imageName, imageUrl } = req.body

    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please fill out all the input fields')
    }

    const checkUser = await User.countDocuments({ email })
    if (checkUser) {
        res.status(403)
        throw new Error('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    let newUser = new User({
        username, email,
        password: hash
    })

    if (imageName) {
        newUser.imageName = imageName
        newUser.imageUrl = imageUrl
    }

    newUser = await newUser.save()
    res.status(201).json(newUser)
})

// @desc   Login user
// @route  POST api/auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, pass } = req.body

    if (!email || !pass) {
        res.status(400)
        throw new Error('Please fill all the input fields')
    }

    const user = await User.findOne({ email })
    if (!user || !bcrypt.compareSync(pass, user.password)) {
        res.status(401)
        throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

    res.cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + (86409000 / 15)),
        secure: true,
        sameSite: 'none'
    })

    const { password, isAdmin, ...other } = user._doc

    res.status(200).json({ ...other, token })
})