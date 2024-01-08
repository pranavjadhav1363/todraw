// const jwt = require("jsonwebtoken")
// require('dotenv').config()


// const PRIVATE_KEY = process.env.PRIVATE_KEY


// const authuser = async (req, res, next) => {
//     let success = false
//     try {
//         const token = req.header('auth-token');
//         // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYzMjA5M2EwOTUxNTEyNDM4OGUzYjU3OCIsIkFkbWluVHlwZSI6IkFkbWluIn0sImlhdCI6MTY2MzA4NDMxOX0.G4zkm1F-JX4nIPT9s5vMQYO8SDsp6ujH9lZkLglY90o"

//         // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYyZmM5Y2Q2NTNjYTRmZmJhMWY1OWRlNyIsIkFkbWluVHlwZSI6IkVtcGxveWVlIn0sImlhdCI6MTY2MDcyMzA3MH0.tTmOaIMmD4tEORYRUbcJZhKSq4hxuwmSknq3MfnLN_0";

//         if (!token) {
//             return res.status(400).json({ success: success, response: "login again" })

//         }
//         success = true
//         const data = await jwt.verify(token, PRIVATE_KEY);
//         req.user = data.admin


//         next()
//     } catch (error) {
//         success = false
//         console.log(error)
//         return res.status(400).json({ success: success, err: error.message })

//     }

// }



// module.exports = authuser




const authuser = async (req, res, next) => {
    // let success = false
    try {



        next()
    } catch (error) {
        // success = false
        // console.log(error)
        return false

    }

}



module.exports = authuser