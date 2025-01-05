const Transaction = require('../models/Transaction')

// Get Transactions for a User with Filters
const getTransactionDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const { status, type, from, to, page = 1, limit = 10 } = req.query;

    const fromDate = from && !isNaN(new Date(from)) ? new Date(from) : new Date(0);
    const toDate = to && !isNaN(new Date(to)) ? new Date(to) : new Date();
    toDate.setUTCHours(23, 59, 59, 999);

    const query = {
      userId,
      ...(status && { status }),
      ...(type && { type }),
      transactionDate: { $gte: fromDate, $lte: toDate },
    };

    const transactions = await Transaction.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      transactions,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalTransactions: total,
    });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

  
  // Get Transactions with User Details and Filters
  const getFullTranscationDetails = async (req, res) => {
    const { status, type, from, to, page = 1, limit = 10 } = req.query;
  
    try {
      const match = {};
  
      if (status) match.status = status;
      if (type) match.type = type;
      if (from || to) {
        match.transactionDate = {};
        if (from) match.transactionDate.$gte = new Date(from);
        if (to) match.transactionDate.$lte = new Date(to);
      }
  
      const transactions = await Transaction.aggregate([
        { $match: match },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        { $unwind: '$userDetails' },
        { $skip: (page - 1) * limit },
        { $limit: Number(limit) },
      ]);
  
      const total = await Transaction.countDocuments(match);
  
      res.json({
        transactions,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalTransactions: total,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {getFullTranscationDetails,getTransactionDetails}