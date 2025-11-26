// app/admin/users/page.jsx
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
  FaUserCheck,
  FaUserTimes,
  FaShoppingCart
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-1234',
      location: 'New York, NY',
      status: 'active',
      joinDate: '2024-01-15',
      totalOrders: 12,
      totalSpent: 1250,
      lastOrder: '2024-03-20'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 123-1235',
      location: 'Los Angeles, CA',
      status: 'active',
      joinDate: '2024-02-10',
      totalOrders: 8,
      totalSpent: 890,
      lastOrder: '2024-03-18'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 123-1236',
      location: 'Chicago, IL',
      status: 'inactive',
      joinDate: '2024-01-28',
      totalOrders: 3,
      totalSpent: 320,
      lastOrder: '2024-02-15'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 123-1237',
      location: 'Miami, FL',
      status: 'active',
      joinDate: '2024-03-01',
      totalOrders: 5,
      totalSpent: 540,
      lastOrder: '2024-03-22'
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@email.com',
      phone: '+1 (555) 123-1238',
      location: 'Austin, TX',
      status: 'suspended',
      joinDate: '2024-02-20',
      totalOrders: 2,
      totalSpent: 180,
      lastOrder: '2024-03-10'
    },
    {
      id: 6,
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 123-1239',
      location: 'Seattle, WA',
      status: 'active',
      joinDate: '2024-01-10',
      totalOrders: 15,
      totalSpent: 1670,
      lastOrder: '2024-03-21'
    },
    {
      id: 7,
      name: 'Amanda Thompson',
      email: 'amanda.thompson@email.com',
      phone: '+1 (555) 123-1240',
      location: 'Boston, MA',
      status: 'active',
      joinDate: '2024-02-28',
      totalOrders: 7,
      totalSpent: 720,
      lastOrder: '2024-03-19'
    },
    {
      id: 8,
      name: 'Robert Brown',
      email: 'robert.brown@email.com',
      phone: '+1 (555) 123-1241',
      location: 'Denver, CO',
      status: 'inactive',
      joinDate: '2024-01-20',
      totalOrders: 1,
      totalSpent: 95,
      lastOrder: '2024-01-25'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activateUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'active' } : user
    ));
  };

  const suspendUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'suspended' } : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: FaUserCheck },
      inactive: { color: 'bg-slate-100 text-slate-800', icon: FaUserTimes },
      suspended: { color: 'bg-red-100 text-red-800', icon: FaTimes }
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">User Management</h1>
        <p className="text-slate-600">Manage and monitor all users on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <FaUserCheck className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Users</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <FaUserCheck className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(users.reduce((sum, user) => sum + user.totalSpent, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
              <FaShoppingCart className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(
                  users.reduce((sum, user) => sum + user.totalSpent, 0) / 
                  users.reduce((sum, user) => sum + user.totalOrders, 0) || 0
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <FaShoppingCart className="text-xl" />
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
                placeholder="Search users by name, email, or location..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Last Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-slate-900">{user.name}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-1">
                        <MdEmail className="text-xs" />
                        {user.email}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Joined {formatDate(user.joinDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 flex items-center gap-1 mb-1">
                      <MdPhone className="text-xs" />
                      {user.phone}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <MdLocationOn className="text-xs" />
                      {user.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-center">
                      <span className="text-slate-900 font-medium text-lg">{user.totalOrders}</span>
                      <div className="text-xs text-slate-500">orders</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-center">
                      <span className="text-slate-900 font-medium text-lg">{formatCurrency(user.totalSpent)}</span>
                      <div className="text-xs text-slate-500">lifetime</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">
                      {user.lastOrder ? formatDate(user.lastOrder) : 'Never'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {user.lastOrder ? 'Last order' : 'No orders yet'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View User Details"
                      >
                        <FaEye />
                      </button>
                      
                      {user.status !== 'active' && (
                        <button 
                          onClick={() => activateUser(user.id)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Activate User"
                        >
                          <FaCheck />
                        </button>
                      )}
                      
                      {user.status === 'active' && (
                        <button 
                          onClick={() => suspendUser(user.id)}
                          className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Suspend User"
                        >
                          <FaUserTimes />
                        </button>
                      )}
                      
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
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
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserTimes className="text-3xl text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No users found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {users.filter(u => u.totalOrders > 0).length}
            </div>
            <div className="text-sm text-slate-600">Users with Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {users.reduce((sum, user) => sum + user.totalOrders, 0)}
            </div>
            <div className="text-sm text-slate-600">Total Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {formatCurrency(users.reduce((sum, user) => sum + user.totalSpent, 0))}
            </div>
            <div className="text-sm text-slate-600">Total Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;