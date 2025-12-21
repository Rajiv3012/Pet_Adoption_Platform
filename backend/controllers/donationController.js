import Donation from "../models/Donation.js";

// Get all donations (Admin only)
export const getAllDonations = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    let filter = {};
    if (status) filter.paymentStatus = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error("Get donations error:", error);
    res.status(500).json({ msg: "Error fetching donations" });
  }
};

// Get single donation
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ msg: "Donation not found" });
    }

    res.json(donation);
  } catch (error) {
    console.error("Get donation error:", error);
    res.status(500).json({ msg: "Error fetching donation" });
  }
};

// Create new donation
export const createDonation = async (req, res) => {
  try {
    const { donorName, email, amount, paymentId, paymentStatus = "pending" } = req.body;

    // Validate required fields
    if (!donorName || !email || amount == null || !paymentId) {
      return res.status(400).json({ msg: "Missing required donation fields" });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ msg: "Donation amount must be greater than 0" });
    }

    const newDonation = new Donation({
      donorName,
      email,
      amount,
      paymentId,
      paymentStatus
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    console.error("Create donation error:", error);
    res.status(500).json({ msg: "Error processing donation" });
  }
};

// Update donation status (Admin only)
export const updateDonationStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    if (!["pending", "success", "failed"].includes(paymentStatus)) {
      return res.status(400).json({ msg: "Invalid payment status" });
    }

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ msg: "Donation not found" });
    }

    res.json(donation);
  } catch (error) {
    console.error("Update donation status error:", error);
    res.status(500).json({ msg: "Error updating donation status" });
  }
};

// Get donation statistics (Admin only)
export const getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const successfulDonations = await Donation.countDocuments({ paymentStatus: "success" });
    const pendingDonations = await Donation.countDocuments({ paymentStatus: "pending" });
    const failedDonations = await Donation.countDocuments({ paymentStatus: "failed" });

    const totalAmount = await Donation.aggregate([
      { $match: { paymentStatus: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const monthlyStats = await Donation.aggregate([
      { $match: { paymentStatus: "success" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 },
          amount: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 }
    ]);

    res.json({
      totalDonations,
      successfulDonations,
      pendingDonations,
      failedDonations,
      totalAmount: totalAmount[0]?.total || 0,
      monthlyStats
    });
  } catch (error) {
    console.error("Get donation stats error:", error);
    res.status(500).json({ msg: "Error fetching donation statistics" });
  }
};