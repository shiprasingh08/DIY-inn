//importing express
const express = require('express');
const UserRouter = require('./routers/userRouter')
const KitRouter = require('./routers/kitRouter')
const ReviewRouter = require('./routers/reviewRouter')

const cors = require('cors');
const orderRouter = require('./routers/orderRouter');

//initializing express
const app = express();
const port = 5000;

//middleware
app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use('/user', UserRouter);
app.use('/kit', KitRouter);
app.use('/order', orderRouter);
app.use('/review', ReviewRouter);

//route or endpoint
app.get('/', (req, res) => {
    res.send('responce from express');
});

app.listen(port, () => { console.log('server started') });