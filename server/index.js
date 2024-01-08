// require("dotenv").config();
// require('./db/db')
// //LIBARARY IMPORTS
// const cors = require('cors');
// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const PORT = 5003;
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);



// //MODULE-/-ROUTES IMPORTS
// const LoginSignup = require("./routes/LoginSignupRoute/LoginSignup");


// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());
// //ROUTE STRUCTURE
// app.use("/auth", LoginSignup);
// require("./routes/SocketFunctionality/socket.js")(io);

// // const io = new Server();
// server.listen(PORT, () => {
//     console.log(`listening on *:${PORT}`);
// });
require("dotenv").config();
require('./db/db');

const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 5003;
const server = http.createServer(app);
const io = new Server(server);

// Use cors middleware with specific options
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 204,
}));

// Use express.json middleware
app.use(express.json());

// Import and use routes
const LoginSignup = require("./routes/LoginSignupRoute/LoginSignup");
app.use("/auth", LoginSignup);

// Import and use socket functionality
require("./routes/SocketFunctionality/socket.js")(io);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on *:${PORT}`);
});
