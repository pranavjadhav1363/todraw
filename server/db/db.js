const mongoose = require("mongoose")

mongoose.set('strictQuery', false);

const connectionString = 'mongodb://localhost:27017/todraw';


mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });