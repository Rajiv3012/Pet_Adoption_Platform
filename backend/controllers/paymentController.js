import crypto from "crypto";

// Demo Mode - Simulates Razorpay without actual payment processing
const DEMO_MODE = process.env.RAZORPAY_DEMO_MODE === 'true';

// Simulated Razorpay instance for demo
const createDemoOrder = (options) => {
  return {
    id: `order_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount: options.amount,
    currency: options.currency,
    receipt: options.receipt,
    status: 'created',
    created_at: Math.floor(Date.now() / 1000),
    notes: options.notes || {}
  };
};

// Create Razorpay order (Demo Mode)
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, notes } = req.body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        msg: "Valid amount is required" 
      });
    }

    // Create demo order options
    const options = {
      amount: amount * 100, // Convert to paise for consistency
      currency,
      receipt: receipt || `demo_receipt_${Date.now()}`,
      notes: notes || {},
    };

    // Create demo order
    const order = createDemoOrder(options);

    // Simulate slight delay like real API
    await new Promise(resolve => setTimeout(resolve, 500));

    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
      },
      key_id: process.env.RAZORPAY_KEY_ID,
      demo_mode: true,
      message: "Demo order created successfully"
    });
  } catch (error) {
    console.error("Create demo order error:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Failed to create demo payment order",
      error: error.message 
    });
  }
};

// Verify demo payment signature
export const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      donation_details 
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        msg: "Missing payment verification parameters" 
      });
    }

    // Demo signature verification (always succeeds for demo)
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // In demo mode, we simulate successful verification
    const isAuthentic = true; // Always true for demo

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isAuthentic) {
      console.log("Demo payment verified successfully:", {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        donation_details,
        demo_mode: true
      });

      res.status(200).json({
        success: true,
        msg: "Demo payment verified successfully",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        demo_mode: true,
        verification_status: "success"
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "Demo payment verification failed",
        demo_mode: true
      });
    }
  } catch (error) {
    console.error("Demo payment verification error:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Demo payment verification failed",
      error: error.message 
    });
  }
};

// Get demo payment details
export const getPaymentDetails = async (req, res) => {
  try {
    const { payment_id } = req.params;

    if (!payment_id) {
      return res.status(400).json({ 
        success: false, 
        msg: "Payment ID is required" 
      });
    }

    // Simulate payment details for demo
    const demoPayment = {
      id: payment_id,
      amount: 10000, // ₹100 in paise
      currency: 'INR',
      status: 'captured',
      method: 'card',
      created_at: Math.floor(Date.now() / 1000),
      email: 'demo@example.com',
      contact: '+919999999999',
      card: {
        last4: '1111',
        network: 'Visa',
        type: 'credit'
      }
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    res.status(200).json({
      success: true,
      payment: {
        id: demoPayment.id,
        amount: demoPayment.amount / 100, // Convert back to rupees
        currency: demoPayment.currency,
        status: demoPayment.status,
        method: demoPayment.method,
        created_at: demoPayment.created_at,
        email: demoPayment.email,
        contact: demoPayment.contact,
      },
      demo_mode: true
    });
  } catch (error) {
    console.error("Get demo payment details error:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Failed to fetch demo payment details",
      error: error.message 
    });
  }
};

// Handle demo payment failure
export const handlePaymentFailure = async (req, res) => {
  try {
    const { 
      error_code, 
      error_description, 
      error_source, 
      error_step, 
      error_reason,
      order_id,
      payment_id 
    } = req.body;

    console.log("Demo payment failed:", {
      error_code,
      error_description,
      order_id,
      payment_id,
      demo_mode: true
    });

    res.status(200).json({
      success: true,
      msg: "Demo payment failure recorded",
      error_details: {
        code: error_code,
        description: error_description,
        source: error_source,
        step: error_step,
        reason: error_reason
      },
      demo_mode: true
    });
  } catch (error) {
    console.error("Handle demo payment failure error:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Failed to handle demo payment failure",
      error: error.message 
    });
  }
};