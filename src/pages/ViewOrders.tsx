import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Clock, AlertTriangle, CreditCard, CheckCircle, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Order {
  id: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
  location: [number, number];
  rack: string;
  selectedTime: string;
  recommendedTime: string;
  isUrgent: boolean;
  isPaid: boolean;
  reason?: string;
}

const ViewOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'delivered' | 'transit'>('all');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [timeSlots] = useState([
    '9:00-11:00', '11:00-13:00', '13:00-15:00',
    '15:00-17:00', '17:00-19:00', '19:00-21:00'
  ]);

  useEffect(() => {
    // Simulated orders data
    const mockOrders: Order[] = [
      {
        id: 1,
        status: 'In Transit',
        location: [19.0760, 72.8777],
        rack: 'A1',
        selectedTime: '11:00-13:00',
        recommendedTime: '9:00-11:00',
        isUrgent: true,
        isPaid: true,
        reason: 'High traffic expected during afternoon hours'
      },
      {
        id: 2,
        status: 'Delivered',
        location: [19.0330, 72.8597],
        rack: 'B2',
        selectedTime: '15:00-17:00',
        recommendedTime: '15:00-17:00',
        isUrgent: false,
        isPaid: true
      },
      {
        id: 3,
        status: 'Processing',
        location: [19.0178, 72.8478],
        rack: 'C3',
        selectedTime: '13:00-15:00',
        recommendedTime: '11:00-13:00',
        isUrgent: false,
        isPaid: false,
        reason: 'Lower traffic during morning hours'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const handleTimeSelect = (orderId: number, time: string) => {
    setSelectedOrderId(orderId);
    setShowConfirmation(true);
  };

  const confirmTimeSelection = () => {
    if (selectedOrderId) {
      const selectedTime = (document.getElementById(`time-${selectedOrderId}`) as HTMLSelectElement)?.value;
      setOrders(orders.map(order =>
        order.id === selectedOrderId ? { ...order, selectedTime } : order
      ));
    }
    setShowConfirmation(false);
    setSelectedOrderId(null);
  };

  const handleTrackOrder = (order: Order) => {
    setTrackingOrder(order);
  };

  const toggleUrgent = (orderId: number) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, isUrgent: !order.isUrgent } : order
    ));
  };

  const handlePayment = (orderId: number) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, isPaid: true } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'delivered') return order.status === 'Delivered';
    if (activeTab === 'transit') return order.status === 'In Transit';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-6 text-blue-900"
        >
          View Orders
        </motion.h1>

        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-lg p-2 inline-flex space-x-2">
            {['all', 'delivered', 'transit'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 rounded-md transition-all transform hover:shadow-md ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders List */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform perspective-1000">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Orders</h2>
            <div className="space-y-4">
              <AnimatePresence>
                {filteredOrders.map(order => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="border rounded-lg p-4 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-blue-900">Order #{order.id}</h3>
                          {order.isUrgent && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              Urgent
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-blue-700">
                          {order.status === 'Delivered' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : order.status === 'In Transit' ? (
                            <Truck className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                          <span>{order.status}</span>
                        </div>
                        <p className="text-sm text-blue-600">Rack: {order.rack}</p>
                        
                        {order.status === 'In Transit' && (
                          <button
                            onClick={() => handleTrackOrder(order)}
                            className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            Track Order
                          </button>
                        )}
                        
                        <div className="mt-2 space-x-2">
                          <button
                            onClick={() => toggleUrgent(order.id)}
                            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm transition-all duration-300 ${
                              order.isUrgent
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            {order.isUrgent ? 'Remove Urgent' : 'Mark Urgent'}
                          </button>
                          
                          {!order.isPaid && (
                            <button
                              onClick={() => handlePayment(order.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                            >
                              <CreditCard className="w-4 h-4 mr-1" />
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-blue-600">Selected Time:</p>
                        <select
                          id={`time-${order.id}`}
                          value={order.selectedTime}
                          onChange={(e) => handleTimeSelect(order.id, e.target.value)}
                          className="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-blue-500 mt-1"
                        >
                          Recommended: {order.recommendedTime}
                          {order.reason && (
                            <div className="text-xs text-gray-500 mt-1">
                              Why? {order.reason}
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform perspective-1000">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">
              {trackingOrder ? `Tracking Order #${trackingOrder.id}` : 'Track Orders'}
            </h2>
            <div className="h-[500px] rounded-lg overflow-hidden shadow-inner">
              <MapContainer
                center={trackingOrder ? trackingOrder.location : [19.0760, 72.8777]}
                zoom={trackingOrder ? 14 : 12}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {trackingOrder ? (
                  <Marker position={trackingOrder.location}>
                    <Popup>
                      <div className="text-blue-900">
                        <h3 className="font-medium">Order #{trackingOrder.id}</h3>
                        <p>Status: {trackingOrder.status}</p>
                        <p>Rack: {trackingOrder.rack}</p>
                      </div>
                    </Popup>
                  </Marker>
                ) : (
                  filteredOrders.map(order => (
                    <Marker key={order.id} position={order.location}>
                      <Popup>
                        <div className="text-blue-900">
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p>Status: {order.status}</p>
                          <p>Rack: {order.rack}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))
                )}
              </MapContainer>
            </div>
            {trackingOrder && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setTrackingOrder(null)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                View All Orders
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Time Selection Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl"
            >
              <h3 className="text-lg font-medium text-blue-900 mb-4">Confirm Time Selection</h3>
              <p className="text-blue-600 mb-6">Are you sure you want to update the delivery time?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmTimeSelection}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewOrders;