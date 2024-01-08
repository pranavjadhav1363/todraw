const express = require('mongoose')
const authuser = require('../../middleware/auth')
const EntityAccess = require('../../Schemas/EntityAccessSchema')
const User = require('../../Schemas/UserSchema')
const router = express.Router()
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const validator = require("email-validator");

const WelcomeTemplate = fs.readFileSync('welcome.html', 'utf-8');
const AccessTemplate = fs.readFileSync('EntityAccessmail.html', 'utf-8');
const DeleteAccountTemplate = fs.readFileSync('EntityAccessmail.html', 'utf-8');
export const WelcomeMail = (ToEmail, Username) => {
    try {
        const EMAIL = process.env.EMAIL;
        const PASSWORD = process.env.PASSWORD;
        let transporter = nodemailer.createTransport(
            smtpTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            })
        );

        let mailOptions = {
            from: EMAIL,
            to: ToEmail,
            subject: 'Welcome to ToDraw!',
            html: emailTemplate.replace('[Username]', Username)
        };

        transporter.sendMail(mailOptions, async (err, data) => {
            if (err) {
                return { success: false, statuscode: 500, response: "Internal Server Error", error: err.msg }
            }
            console.log("mail send to " + req.body.email);
            return { success: true, statuscode: 200, response: "Mail Send Successfully" }
        });
    } catch (error) {
        return { success: false, statuscode: 500, response: "Internal Server Error", error: err.msg }

    }
}
export const AccessMail = (ToEmail, Username) => {
    try {
        const EMAIL = process.env.EMAIL;
        const PASSWORD = process.env.PASSWORD;
        let transporter = nodemailer.createTransport(
            smtpTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            })
        );

        let mailOptions = {
            from: EMAIL,
            to: ToEmail,
            subject: 'Collaboration Access Granted',
            html: AccessTemplate.replace('[Username]', Username)
        };

        transporter.sendMail(mailOptions, async (err, data) => {
            if (err) {
                return { success: false, statuscode: 500, response: "Internal Server Error", error: err.msg }
            }
            console.log("mail send to " + req.body.email);
            return { success: true, statuscode: 200, response: "Mail Send Successfully" }
        });
    } catch (error) {
        return { success: false, statuscode: 500, response: "Internal Server Error", error: err.msg }

    }
}
export const DeleteAccountMail = (ToEmail, Username) => {
    try {
        const EMAIL = process.env.EMAIL;
        const PASSWORD = process.env.PASSWORD;
        let transporter = nodemailer.createTransport(
            smtpTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            })
        );

        let mailOptions = {
            from: EMAIL,
            to: ToEmail,
            subject: 'Collaboration Access Granted',
            html: DeleteAccountTemplate.replace('[Username]', Username)
        };

        transporter.sendMail(mailOptions, async (err, data) => {
            if (err) {
                return { success: false, statuscode: 500, response: "Internal Server Error", error: err.msg }
            }
            console.log("mail send to " + req.body.email);
            return { success: true, statuscode: 200, response: "Mail Send Successfully" }
        });
    } catch (error) {
        return { success: false, statuscode: 500, response: "Internal Server Error", error: err.msg }

    }
}

