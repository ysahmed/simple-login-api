const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const loginRouter = require('./routes/loginRoutes');
const dataRouter = require('./routes/dataRoutes');
const errorHandler = require('./middleware/error');

app.use(express.json());

//mount routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/data', dataRouter);

app.use(errorHandler);

module.exports = app;
