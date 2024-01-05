

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} user connected`);



        socket.on("disconnect", () => {
            hashmap.delete(socket.buzz_name);
            clearInterval(sendNearbyUsersInterval);
            io.emit("info", { event: "disconnect", data: { buzz_name: socket.buzz_name } });
            console.log(`${socket.id} disconnected`);
        });
    });
}