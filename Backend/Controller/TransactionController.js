import Transaction from "../Models/Transaction.js";
export const addTransaction = async (req, res) => {
  try {
    const {
      title,
      amount,
      type,
      category,
      date,
      paymentMethod,
      notes
    } = req.body;

    // Get user ID from verified JWT
    const userId = req.user.userId;

    // Create transaction
    const newTransaction = await Transaction.create({
      userId,
      title,
      amount,
      type,
      category,
      date,
      paymentMethod,
      notes
    });

    return res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction: newTransaction
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
