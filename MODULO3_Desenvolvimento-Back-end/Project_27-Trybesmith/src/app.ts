import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import userRouter from './routers/userRouter';
import loginRouter from './routers/loginRouter';
import productRouter from './routers/productRouter';
import orderRouter from './routers/orderRouter';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use(errorMiddleware);

export default app;
