const express = require('express');
require('dotenv').config()
const fs = require('fs');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../Schemas/UserSchema')
const FolderFiles = require('../../Schemas/FileSchema')




router.post('/login', async (req, res) => {
    try {
        const CheckIfUserAlreadyExists = await User.findOne({ Email: req.body.Email })
        if (CheckIfUserAlreadyExists) {
            const comparepassword = await bcrypt.compare(req.body.Password, CheckIfUserAlreadyExists.Password)
            if (comparepassword) {
                const jwtdata = {
                    user: {
                        id: CheckIfUserAlreadyExists._id,
                    }
                };
                const jwttoken = jwt.sign(jwtdata, PRIVATE_KEY)
                return res.status(200).json({ success: false, response: "ACCOUNT LOGIN SUCCESSFULL", token: jwttoken })
            }
            return res.status(401).json({ success: false, response: "Invalid Email Or Password" })
        }
        return res.status(401).json({ success: false, response: "Invalid Email Or Password" })

    } catch (error) {
        return res.status(500).json({ success: false, response: 'Internal Server Error', error: error.message })
    }
})
router.post('/signup', async (req, res) => {
    try {
        const CheckIfUserAlreadyExists = await User.findOne({ Email: req.body.Email })
        if (CheckIfUserAlreadyExists) {
            return res.status(409).json({ success: false, response: "User Already Exists" })
        }
        const saltRounds = await bcrypt.genSalt(10);

        const secpass = await bcrypt.hash(req.body.Password, saltRounds)
        const CreateUser = await User.create({
            Username: req.body.Username,
            Email: req.body.Email,
            Password: secpass,
            Gender: req.body.Gender,
        })
        if (CreateUser) {

            fs.mkdir(`./uploads/${CreateUser._id}`, { recursive: true }, (err) => {
                if (err) {

                    return res.status(500).json({ success: false, response: 'Internal Server Error', error: err })
                } else {

                    console.log('Directory created successfully');

                }
            });
            const CreateTheRootFolder = await FolderFiles.create({
                UserId: CreateUser._id,
                ParentFolder: { UserId: CreateUser._id, FolderName: CreateUser._id },
                Entities: []
            })
            if (CreateTheRootFolder) {
                const jwtdata = {
                    user: {
                        id: CreateUser._id,
                    }
                };
                const jwttoken = jwt.sign(jwtdata, PRIVATE_KEY)
                return res.status(200).json({ success: true, response: "ACCOUNT CREATED SUCCESSFULLY", token: jwttoken })
            }

        }
    } catch (error) {
        return res.status(500).json({ success: false, response: 'Internal Server Error', error: error.message })
    }
})


module.exports = router