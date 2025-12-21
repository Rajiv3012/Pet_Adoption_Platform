import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { paymentAPI } from '../services/api';
import RazorpayDemoModal from '../components/RazorpayDemoModal';

export default function Donation() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment Processing, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Donor information
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const predefinedAmounts = [50, 100, 250, 500, 1000, 2500];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount;
  };

  const handleDonorInfoChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateDonorInfo = () => {
    const { name, email, phone } = donorInfo;
    if (!name || !email || !phone) {
      setError('Please fill in all required fields (Name, Email, Phone)');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Basic phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    
    return true;
  };

  const handleProceedToPayment = async () => {
    setError('');
    
    // Validate amount
    const amount = getCurrentAmount();
    if (!amount || amount <= 0) {
      setError('Please select or enter a valid donation amount');
      return;
    }

    // Validate donor information
    if (!validateDonorInfo()) {
      return;
    }

    setLoading(true);

    try {
      // Create order on backend (demo mode)
      const orderResponse = await paymentAPI.createOrder({
        amount: amount,
        currency: 'INR',
        receipt: `donation_${Date.now()}`,
        notes: {
          donation_type: donationType,
          donor_name: donorInfo.name,
          donor_email: donorInfo.email,
          donor_phone: donorInfo.phone
        }
      });

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.msg || 'Failed to create payment order');
      }

      const { order } = orderResponse.data;
      setCurrentOrder(order);
      setShowRazorpayModal(true);

    } catch (error) {
      console.error('Payment initiation error:', error);
      setError(error.message || 'Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      setLoading(true);
      
      // Verify payment on backend
      const verificationResponse = await paymentAPI.verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        donation_details: {
          amount: getCurrentAmount(),
          donation_type: donationType,
          donor_info: donorInfo
        }
      });

      if (verificationResponse.data.success) {
        setPaymentDetails({
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          amount: getCurrentAmount(),
          donation_type: donationType,
          donor_info: donorInfo,
          demo_mode: true
        });
        setStep(3);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setError('Payment verification failed. Please contact support.');
    } finally {
      setLoading(false);
      setShowRazorpayModal(false);
    }
  };

  const handlePaymentFailure = async (response) => {
    try {
      await paymentAPI.handlePaymentFailure({
        error_code: response.error.code,
        error_description: response.error.description,
        error_source: response.error.source,
        error_step: response.error.step,
        error_reason: response.error.reason,
        order_id: currentOrder?.id
      });
    } catch (error) {
      console.error('Error logging payment failure:', error);
    }
    
    setError(`Payment failed: ${response.error.description}`);
    setShowRazorpayModal(false);
  };

  // Success page
  if (step === 3 && paymentDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-6">
        <motion.div 
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-4">
            Your donation of ₹{paymentDetails.amount} has been processed successfully.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Payment ID:</span> {paymentDetails.payment_id}</p>
              <p><span className="font-medium">Amount:</span> ₹{paymentDetails.amount}</p>
              <p><span className="font-medium">Type:</span> {paymentDetails.donation_type}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to {paymentDetails.donor_info.email}
          </p>
          
          <div className="space-y-3">
            <Link 
              to="/" 
              className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Back to Home
            </Link>
            <Link 
              to="/pets" 
              className="block w-full border-2 border-pink-600 text-pink-600 py-3 px-6 rounded-xl font-semibold hover:bg-pink-50 transition-all"
            >
              View Pets for Adoption
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Secured by Razorpay</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Payment Form */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-3xl shadow-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700">{error}</p>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Make a Donation</h1>
                  <p className="text-gray-600 text-center mb-8">Help us save more pets in need</p>

                  {/* Donation Type */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Type</h3>
                    <div className="flex bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => setDonationType('one-time')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                          donationType === 'one-time' 
                            ? 'bg-white text-pink-600 shadow-md' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        One-time
                      </button>
                      <button
                        onClick={() => setDonationType('monthly')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                          donationType === 'monthly' 
                            ? 'bg-white text-pink-600 shadow-md' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Amount</h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          className={`p-4 rounded-xl font-semibold transition-all ${
                            selectedAmount === amount
                              ? 'bg-pink-600 text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl text-center text-lg font-semibold focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={donorInfo.name}
                          onChange={handleDonorInfoChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={donorInfo.email}
                          onChange={handleDonorInfoChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={donorInfo.phone}
                          onChange={handleDonorInfoChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address (Optional)</label>
                        <input
                          type="text"
                          name="address"
                          value={donorInfo.address}
                          onChange={handleDonorInfoChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Enter your address"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={loading || !getCurrentAmount() || getCurrentAmount() <= 0}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-8 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : `Donate ₹${getCurrentAmount() || 0} Securely`}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-3xl shadow-xl p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Donation Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donation Type</span>
                  <span className="font-semibold capitalize">{donationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-semibold">₹{getCurrentAmount() || 0}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-pink-600">₹{getCurrentAmount() || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Your Impact</h4>
                <p className="text-sm text-gray-600">
                  Your donation of ₹{getCurrentAmount() || 0} can help provide food, shelter, and medical care for pets in need.
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Secured by Razorpay</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>256-bit SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Razorpay Demo Modal */}
      <RazorpayDemoModal
        isOpen={showRazorpayModal}
        onClose={() => setShowRazorpayModal(false)}
        orderDetails={currentOrder}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />
    </div>
  );
}