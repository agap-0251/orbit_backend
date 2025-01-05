const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    status: {
      type: String,
      enum: ['success', 'pending', 'failed'],
    },
    type: {
      type: String,
      enum: ['debit', 'credit'],
    },
    transactionDate: Date,
    amount: Number,
    userId: mongoose.Schema.Types.ObjectId,
  });
  
  
const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction