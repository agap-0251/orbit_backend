require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Transaction = require('./models/Transaction')
const User = require('./models/User')


// Populate Sample Data Route (For Testing Purpose)
const fillValues =  async () => {
  console.log("hello")
    try {
      const users = [];
      for (let i = 0; i < 10; i++) {
        users.push(new User({
          name: `User ${i + 1}`,
          phoneNumber: `123456789${i}`,
        }));
      }
  
      const savedUsers = await User.insertMany(users);
  
      const transactions = [];
      savedUsers.forEach(user => {
        for (let j = 0; j < 5; j++) {
          transactions.push(new Transaction({
            status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)],
            type: ['debit', 'credit'][Math.floor(Math.random() * 2)],
            transactionDate: new Date(2023, 0, 1 + Math.floor(Math.random() * 730)), // Random date in 2023-2024
            amount: Math.floor(Math.random() * 1000) + 1,
            userId: user._id,
          }));
        }
      });
  
      await Transaction.insertMany(transactions);
      console.log({ message: 'Sample data populated successfully' });
    } catch (err) {
      console.log({ error: err.message });
    }
  };

  // const MONGO_URI = 'mongodb://localhost:27017/';
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected')
      fillValues();
    })
    .catch(err => console.error('MongoDB connection error:', err));



  