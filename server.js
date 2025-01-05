const express =require('express')
const mongoose = require('mongoose')
const userRoutes = require("./routes/user.route.js")
const transactionRoutes = require("./routes/transaction.route.js")
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/';
mongoose.connect(MONGO_URI, {dbName : 'orbit-wallet'})
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users',userRoutes)
app.use('/api/transactions',transactionRoutes)

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
