import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Building, Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function RazorpayDemoModal({ 
  isOpen, 
  onClose, 
  orderDetails, 
  onSuccess, 
  onFailure 
}) {
  const [currentStep, setCurrentStep] = useState('payment-methods'); // payment-methods, card-form, upi-form, processing, success
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');

  const paymentMethods = [
    { 
      id: 'card', 
      icon: CreditCard, 
      name: 'Card', 
      description: 'Credit/Debit Cards',
      popular: true 
    },
    { 
      id: 'upi', 
      icon: Smartphone, 
      name: 'UPI', 
      description: 'Pay using UPI ID' 
    },
    { 
      id: 'netbanking', 
      icon: Building, 
      name: 'Net Banking', 
      description: 'Online Banking' 
    }
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    if (method === 'card') {
      setCurrentStep('card-form');
    } else if (method === 'upi') {
      setCurrentStep('upi-form');
    } else {
      // For demo, we'll simulate immediate success for other methods
      handlePayment();
    }
  };

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  const handlePayment = async () => {
    setProcessing(true);
    setCurrentStep('processing');

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // For demo, we'll randomly succeed or fail (90% success rate)
    const shouldSucceed = Math.random() > 0.1;

    if (shouldSucceed) {
      const demoResponse = {
        razorpay_payment_id: `pay_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        razorpay_order_id: orderDetails.id,
        razorpay_signature: `demo_signature_${Date.now()}`
      };
      
      setCurrentStep('success');
      setTimeout(() => {
        onSuccess(demoResponse);
        onClose();
      }, 2000);
    } else {
      const errorResponse = {
        error: {
          code: 'PAYMENT_FAILED',
          description: 'Payment was declined by your bank. Please try again.',
          source: 'customer',
          step: 'payment_authentication',
          reason: 'payment_failed'
        }
      };
      
      onFailure(errorResponse);
      onClose();
    }
  };

  const validateCardForm = () => {
    return cardDetails.number.replace(/\s/g, '').length >= 16 &&
           cardDetails.expiry.length >= 5 &&
           cardDetails.cvv.length >= 3 &&
           cardDetails.name.length >= 2;
  };

  const validateUpiForm = () => {
    return upiId.includes('@') && upiId.length >= 5;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Pet Adoption Platform</h2>
                <p className="text-blue-100 text-sm">Secure Payment</p>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Amount to pay</span>
                <span className="text-xl font-bold">₹{orderDetails?.amount / 100}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {currentStep === 'payment-methods' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
                
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleMethodSelect(method.id)}
                      className="w-full border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <method.icon className="w-6 h-6 text-blue-600" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{method.name}</span>
                            {method.popular && (
                              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Popular</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secured by Razorpay</span>
                </div>
              </motion.div>
            )}

            {currentStep === 'card-form' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setCurrentStep('payment-methods')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    ← Back
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">Card Details</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formatCardNumber(cardDetails.number)}
                      onChange={(e) => handleCardInputChange('number', e.target.value.replace(/\s/g, ''))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="19"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formatExpiry(cardDetails.expiry)}
                        onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => handleCardInputChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={!validateCardForm()}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pay ₹{orderDetails?.amount / 100}
                </button>
              </motion.div>
            )}

            {currentStep === 'upi-form' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setCurrentStep('payment-methods')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    ← Back
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">UPI Payment</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700">
                      Enter your UPI ID (e.g., yourname@paytm, yourname@gpay)
                    </p>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={!validateUpiForm()}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pay ₹{orderDetails?.amount / 100}
                </button>
              </motion.div>
            )}

            {currentStep === 'processing' && (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
                <p className="text-gray-600">Please wait while we process your payment...</p>
                <div className="mt-4 bg-yellow-50 rounded-lg p-3">
                  <p className="text-sm text-yellow-700">
                    🔒 Do not close this window or press back button
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 'success' && (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600">Your donation has been processed successfully.</p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Secure</span>
              </div>
              <span>Powered by Razorpay</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}