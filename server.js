require('dotenv').config()
const express =require('express')
const mongoose = require('mongoose')
const userRoutes = require("./routes/user.route.js")
const transactionRoutes = require("./routes/transaction.route.js")
const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users',userRoutes)
app.use('/api/transactions',transactionRoutes)
app.get('/',(req,res) => { res.json("Hello")});
// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
