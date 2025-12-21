import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Shield, Home, Users, Stethoscope, Clock } from 'lucide-react';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Moving text animation variants
  const movingTextVariants = {
    animate: {
      x: ["-100%", "100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const floatingTextVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const petCareValues = [
    {
      icon: Heart,
      title: "Love & Compassion",
      description: "Every pet deserves unconditional love, patience, and understanding. They give us their hearts completely."
    },
    {
      icon: Shield,
      title: "Safety & Protection",
      description: "Providing a secure environment, proper identification, and protection from harm is our responsibility."
    },
    {
      icon: Home,
      title: "Comfortable Home",
      description: "A warm, clean, and comfortable living space where pets can feel safe and truly belong."
    },
    {
      icon: Stethoscope,
      title: "Health & Wellness",
      description: "Regular veterinary care, proper nutrition, and preventive treatments keep our companions healthy."
    },
    {
      icon: Users,
      title: "Socialization",
      description: "Proper socialization and training help pets become well-adjusted members of our families and communities."
    },
    {
      icon: Clock,
      title: "Time & Attention",
      description: "Quality time, exercise, play, and mental stimulation are essential for a pet's happiness and well-being."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Pet Care
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            At the heart of every wagging tail and gentle purr lies a simple truth: pets are not just animals, 
            they are family members who deserve our love, care, and commitment for their entire lives.
          </motion.p>
        </div>
      </motion.section>

      {/* Moving Text Banner */}
      <motion.section className="py-12 overflow-hidden bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="relative">
          <motion.div
            className="whitespace-nowrap text-4xl md:text-6xl font-bold text-gray-800 opacity-20"
            variants={movingTextVariants}
            animate="animate"
          >
            🐕 Love • Care • Protect • Adopt • Volunteer • Donate • Love • Care • Protect • Adopt • Volunteer • Donate • 🐱
          </motion.div>
        </div>
      </motion.section>

      {/* Typewriter Effect Section */}
      <motion.section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={typewriterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
          >
            {"Every Pet Deserves Love".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div className="flex flex-wrap justify-center gap-4 mt-8">
            {["🐕", "🐱", "🐰", "🐦", "🐹"].map((emoji, index) => (
              <motion.div
                key={index}
                className="text-6xl"
                variants={floatingTextVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section 
        className="py-16 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-center text-gray-900 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We believe that every pet deserves a loving home and proper care. Our mission is to connect 
              compassionate families with pets in need, while educating our community about responsible 
              pet ownership. Together, we can create a world where no pet goes without love, care, and a forever home.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Animated Quote Section */}
      <motion.section className="py-16 px-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-semibold text-gray-800 italic mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              "The greatness of a nation can be judged by the way its animals are treated."
            </motion.h3>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              - Mahatma Gandhi
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Pet Care Values */}
      <motion.section 
        className="py-20 px-6"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            {...fadeInUp}
          >
            How We Should Care for Our Pets
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Caring for a pet is a privilege and responsibility that enriches both their lives and ours.
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {petCareValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {value.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {value.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            >
              Ready to Make a Difference?
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            >
              Join our community of pet lovers and help us create a world where every pet finds their perfect home.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/pets">
                <motion.button 
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Adopt a Pet
                </motion.button>
              </Link>
              
              <Link to="/volunteer">
                <motion.button 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Volunteer Today
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}