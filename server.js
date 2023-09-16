require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (ex) => {
    console.log(ex);
});

mongoose
    .connect(`${process.env._MONGO_SERVER}${process.env._MONGO_DATABASE}`)
    .then(() => console.log('DB connected...'))
    .catch((e) => console.log(`DB connection failed with ERROR: ${e}`));

const port = process.env._PORT || 3000;
app.listen(port, () => console.log(`Listening to port: ${port}`));
