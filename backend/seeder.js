import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import users from './data/users.js';
import products from './data/products.js';
import colors from 'colors';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Delete all the preexisting records.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    // Fetch admin user id
    const adminUser = createdUsers[0]._id;

    // Admin user is creating all the products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    const createdProducts = await Product.insertMany(sampleProducts);

    console.log(`Data imported!`.green.bold);
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all the preexisting records.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`Data deleted`.red.bold);
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] == '-d') {
  destroyData();
} else {
  importData();
}
