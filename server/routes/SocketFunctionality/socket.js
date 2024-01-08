

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} user connected`);


        io.emit('message', 'A new user has joined.');


        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected`);
        });
    });
}