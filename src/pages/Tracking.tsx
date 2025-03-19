import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, MapPin, Phone, User, Clock } from 'lucide-react';

function Tracking() {
  const navigate = useNavigate();

  const deliverySteps = [
    { status: 'Order Placed', completed: true, time: '10:00 AM' },
    { status: 'Picked Up', completed: true, time: '11:30 AM' },
    { status: 'In Transit', completed: true, time: '2:15 PM' },
    { status: 'Out for Delivery', completed: false, time: 'Expected 4:30 PM' },
    { status: 'Delivered', completed: false, time: 'Expected 5:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/user-dashboard')}>
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gradient">ParcelAI</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tracking Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Tracking Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Tracking ID: #PRC001
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-8">
                    {deliverySteps.map((step, index) => (
                      <div key={index} className="relative">
                        {index !== deliverySteps.length - 1 && (
                          <div className={`absolute h-full w-0.5 left-6 top-8 ${
                            step.completed ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`} />
                        )}
                        <div className="relative flex items-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className={`h-12 w-12 rounded-full flex items-center justify-center ${
                              step.completed
                                ? 'bg-blue-500'
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <Package className={`h-6 w-6 ${
                              step.completed ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                            }`} />
                          </motion.div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <p className={`text-sm font-medium ${
                                step.completed
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                {step.status}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {step.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Delivery Partner Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  Delivery Partner
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      John Smith
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Phone className="h-4 w-4" />
                      <span>+1 234-567-8900</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  Delivery Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>Pickup Location</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      123 Main St, New York, NY 10001
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>Delivery Location</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      456 Park Ave, New York, NY 10022
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>Expected Delivery Time</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      Today, 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/user-dashboard')}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Tracking;