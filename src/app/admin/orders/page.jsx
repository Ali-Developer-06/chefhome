// app/admin/orders/page.jsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaTimes,
  FaEye,
  FaShippingFast,
  FaMoneyBillWave,
  FaClock
} from 'react-icons/fa';
import { MdPending, MdRestaurant, MdPerson } from 'react-icons/md';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Sarah Johnson',
      chef: 'Marco Bellucci',
      items: ['Truffle Risotto', 'Tiramisu'],
      total: 125,
      status: 'completed',
      orderDate: '2024-03-20',
      deliveryDate: '2024-03-20',
      address: '123 Main St, New York, NY',
      payment: 'credit_card',
      specialInstructions: 'No nuts please'
    },
    {
      id: 'ORD-002',
      customer: 'Mike Chen',
      chef: 'Sophie Laurent',
      items: ['Macarons (12pcs)', 'Chocolate Soufflé'],
      total: 85,
      status: 'preparing',
      orderDate: '2024-03-22',
      deliveryDate: '2024-03-22',
      address: '456 Oak Ave, Los Angeles, CA',
      payment: 'paypal',
      specialInstructions: 'Birthday celebration'
    },
    {
      id: 'ORD-003',
      customer: 'Emma Davis',
      chef: 'Kenji Tanaka',
      items: ['Sushi Platter', 'Miso Soup'],
      total: 95,
      status: 'pending',
      orderDate: '2024-03-22',
      deliveryDate: '2024-03-23',
      address: '789 Pine St, Chicago, IL',
      payment: 'credit_card',
      specialInstructions: 'Allergy: Shellfish'
    },
    {
      id: 'ORD-004',
      customer: 'James Wilson',
      chef: 'Isabella Rossi',
      items: ['Seafood Paella', 'Greek Salad'],
      total: 110,
      status: 'shipped',
      orderDate: '2024-03-21',
      deliveryDate: '2024-03-21',
      address: '321 Beach Blvd, Miami, FL',
      payment: 'credit_card',
      specialInstructions: 'Extra spicy'
    },
    {
      id: 'ORD-005',
      customer: 'Lisa Rodriguez',
      chef: 'Carlos Mendez',
      items: ['Tacos (6pcs)', 'Guacamole'],
      total: 65,
      status: 'cancelled',
      orderDate: '2024-03-20',
      deliveryDate: '2024-03-20',
      address: '654 Spice Rd, Austin, TX',
      payment: 'credit_card',
      specialInstructions: 'Vegetarian options'
    },
    {
      id: 'ORD-006',
      customer: 'David Kim',
      chef: 'Priya Sharma',
      items: ['Butter Chicken', 'Garlic Naan', 'Biryani'],
      total: 140,
      status: 'completed',
      orderDate: '2024-03-19',
      deliveryDate: '2024-03-19',
      address: '987 Tech Park, Seattle, WA',
      payment: 'apple_pay',
      specialInstructions: 'Medium spice level'
    },
    {
      id: 'ORD-007',
      customer: 'Amanda Thompson',
      chef: 'Marco Bellucci',
      items: ['Wood-fired Pizza', 'Caesar Salad'],
      total: 75,
      status: 'preparing',
      orderDate: '2024-03-22',
      deliveryDate: '2024-03-22',
      address: '147 College St, Boston, MA',
      payment: 'credit_card',
      specialInstructions: 'Gluten-free crust'
    },
    {
      id: 'ORD-008',
      customer: 'Robert Brown',
      chef: 'Sophie Laurent',
      items: ['Croissants (6pcs)', 'French Toast'],
      total: 55,
      status: 'pending',
      orderDate: '2024-03-22',
      deliveryDate: '2024-03-23',
      address: '258 Mountain View, Denver, CO',
      payment: 'paypal',
      specialInstructions: 'Breakfast delivery'
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.chef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-amber-100 text-amber-800', icon: MdPending },
      preparing: { color: 'bg-blue-100 text-blue-800', icon: MdRestaurant },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: FaShippingFast },
      completed: { color: 'bg-green-100 text-green-800', icon: FaCheck },
      cancelled: { color: 'bg-red-100 text-red-800', icon: FaTimes }
    };
    
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentMethod = (method) => {
    const methods = {
      credit_card: 'Credit Card',
      paypal: 'PayPal',
      apple_pay: 'Apple Pay'
    };
    return methods[method] || method;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusOptions = (currentStatus) => {
    const allStatuses = ['pending', 'preparing', 'shipped', 'completed', 'cancelled'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Management</h1>
        <p className="text-slate-600">Manage and track all orders on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{orders.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <FaShippingFast className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
              <MdPending className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Revenue Today</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(orders
                  .filter(o => o.status === 'completed' && o.orderDate === new Date().toISOString().split('T')[0])
                  .reduce((sum, order) => sum + order.total, 0)
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <FaMoneyBillWave className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(
                  orders.reduce((sum, order) => sum + order.total, 0) / orders.length || 0
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <FaMoneyBillWave className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders by ID, customer, or chef..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Filter by status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Customer & Chef
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-mono font-bold text-slate-900 text-lg">{order.id}</div>
                      <div className="text-sm text-slate-600 mt-1">
                        {order.items.slice(0, 2).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                      {order.specialInstructions && (
                        <div className="text-xs text-amber-600 mt-1">
                          📝 {order.specialInstructions}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-1 text-sm text-slate-600 mb-1">
                          <MdPerson className="text-xs" />
                          Customer
                        </div>
                        <div className="font-medium text-slate-900">{order.customer}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-sm text-slate-600 mb-1">
                          <MdRestaurant className="text-xs" />
                          Chef
                        </div>
                        <div className="font-medium text-slate-900">{order.chef}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-900">
                        {formatCurrency(order.total)}
                      </div>
                      <div className="text-xs text-slate-500 capitalize">
                        {getPaymentMethod(order.payment)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm space-y-1">
                      <div>
                        <div className="text-slate-600 text-xs">Ordered</div>
                        <div className="text-slate-900">{formatDate(order.orderDate)}</div>
                      </div>
                      <div>
                        <div className="text-slate-600 text-xs">Delivery</div>
                        <div className="text-slate-900">{formatDate(order.deliveryDate)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Order Details"
                      >
                        <FaEye />
                      </button>
                      
                      {/* Status Update Dropdown */}
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                          <FaEdit className="text-xs" />
                        </div>
                      </div>

                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShippingFast className="text-3xl text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
            </div>
            <div className="text-sm text-slate-600">Total Revenue</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {orders.filter(o => o.status === 'completed').length}
            </div>
            <div className="text-sm text-slate-600">Completed Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length}
            </div>
            <div className="text-sm text-slate-600">Active Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {orders.filter(o => o.status === 'cancelled').length}
            </div>
            <div className="text-sm text-slate-600">Cancelled Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;