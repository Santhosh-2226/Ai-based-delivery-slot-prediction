import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, MapPin, Weight, Box, CreditCard } from 'lucide-react';

function ParcelBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    parcelType: 'document',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    selectedSlot: '',
    paymentMethod: 'cod',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/tracking');
  };

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

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Book a New Parcel
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Fill in the details to schedule your parcel pickup
            </p>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Pickup Address */}
                <div>
                  <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pickup Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="pickupAddress"
                      name="pickupAddress"
                      rows={3}
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.pickupAddress}
                      onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                    />
                  </div>
                </div>

                {/* Dropoff Address */}
                <div>
                  <label htmlFor="dropoffAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dropoff Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="dropoffAddress"
                      name="dropoffAddress"
                      rows={3}
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.dropoffAddress}
                      onChange={(e) => setFormData({ ...formData, dropoffAddress: e.target.value })}
                    />
                  </div>
                </div>

                {/* Parcel Type */}
                <div>
                  <label htmlFor="parcelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Parcel Type
                  </label>
                  <div className="mt-1">
                    <select
                      id="parcelType"
                      name="parcelType"
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.parcelType}
                      onChange={(e) => setFormData({ ...formData, parcelType: e.target.value })}
                    >
                      <option value="document">Document</option>
                      <option value="fragile">Fragile</option>
                      <option value="heavy">Heavy</option>
                      <option value="perishable">Perishable</option>
                    </select>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Weight (kg)
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Weight className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dimensions (cm)
                  </label>
                  <div className="mt-1 grid grid-cols-3 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Box className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        placeholder="Length"
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.dimensions.length}
                        onChange={(e) => setFormData({
                          ...formData,
                          dimensions: { ...formData.dimensions, length: e.target.value }
                        })}
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Box className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        placeholder="Width"
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.dimensions.width}
                        onChange={(e) => setFormData({
                          ...formData,
                          dimensions: { ...formData.dimensions, width: e.target.value }
                        })}
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Box className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        placeholder="Height"
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.dimensions.height}
                        onChange={(e) => setFormData({
                          ...formData,
                          dimensions: { ...formData.dimensions, height: e.target.value }
                        })}
                      />
                    </div>
                
                  </div>
                </div>

                {/* AI-Recommended Slots */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    AI-Recommended Time Slots
                  </label>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {[
                      { time: '9:00 AM - 11:00 AM', score: '98%' },
                      { time: '2:00 PM - 4:00 PM', score: '95%' },
                      { time: '4:00 PM - 6:00 PM', score: '90%' },
                      { time: '6:00 PM - 8:00 PM', score: '85%' },
                    ].map((slot, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 border rounded-lg cursor-pointer ${
                          formData.selectedSlot === slot.time
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => setFormData({ ...formData, selectedSlot: slot.time })}
                      >
                        <div className="font-medium text-gray-900 dark:text-white">{slot.time}</div>
                        <div className="text-sm text-green-600 dark:text-green-400">
                          AI Score: {slot.score}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payment Method
                  </label>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {[
                      { id: 'cod', name: 'Cash on Delivery' },
                      { id: 'card', name: 'Credit/Debit Card' },
                      { id: 'upi', name: 'UPI' },
                    ].map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 border rounded-lg cursor-pointer ${
                          formData.paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      >
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">{method.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-right sm:px-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Confirm Order
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

export default ParcelBooking;