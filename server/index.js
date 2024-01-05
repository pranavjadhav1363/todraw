require("dotenv").config();
require('./db/db')
//LIBARARY IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5003;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



//MODULE-/-ROUTES IMPORTS
const LoginSignup = require("./routes/LoginSignupRoute/LoginSignup");



app.use(express.json());
//ROUTE STRUCTURE
app.use("/auth", LoginSignup);
require("./routes/SocketFunctionality/socket.js")(io);


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
