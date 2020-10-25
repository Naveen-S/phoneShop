// Type = module, enables us to make use of import, export syntax in node.
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'; // Just to add colors to your console messages.
import connectDB from './config/db.js';
import ProductRouter from './routes/productRoute.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('Hola!!!');
});

app.use('/api/products', ProductRouter);
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// app.get('/api/products/:id', (req, res) => {
//   const product = products.find((p) => {
//     return p._id === req.params.id;
//   });
//   res.json(product);
// });
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  );
});
