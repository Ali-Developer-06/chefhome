// app/admin/dashboard/page.jsx
'use client';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaUserChef, 
  FaShoppingCart, 
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaClock
} from 'react-icons/fa';
import { PiChefHatFill } from "react-icons/pi";
import { MdRestaurantMenu, MdPendingActions } from 'react-icons/md';

const AdminDashboard = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Users',
      value: '1,250',
      change: '+12%',
      trend: 'up',
      icon: FaUsers,
      color: 'blue'
    },
    {
      title: 'Total Chefs',
      value: '85',
      change: '+5%',
      trend: 'up',
      icon: PiChefHatFill,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: '3,200',
      change: '+18%',
      trend: 'up',
      icon: FaShoppingCart,
      color: 'purple'
    },
    {
      title: 'Total Revenue',
      value: '$125,000',
      change: '+22%',
      trend: 'up',
      icon: FaDollarSign,
      color: 'amber'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'new_chef',
      message: 'Chef Marco Bellucci joined the platform',
      time: '5 minutes ago',
      icon: PiChefHatFill
    },
    {
      id: 2,
      type: 'new_order',
      message: 'New order #ORD-1234 placed',
      time: '15 minutes ago',
      icon: FaShoppingCart
    },
    {
      id: 3,
      type: 'chef_verified',
      message: 'Chef Sophie Laurent verified',
      time: '1 hour ago',
      icon: MdRestaurantMenu
    },
    {
      id: 4,
      type: 'user_signup',
      message: '25 new users signed up today',
      time: '2 hours ago',
      icon: FaUsers
    }
  ];

  const pendingActions = [
    {
      title: 'Chef Verifications',
      count: 12,
      icon: MdPendingActions
    },
    {
      title: 'Pending Orders',
      count: 8,
      icon: FaClock
    },
    {
      title: 'Menu Approvals',
      count: 5,
      icon: MdRestaurantMenu
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back, Admin! Here's what's happening today.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                  <span>{stat.change} from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-amber-100 text-amber-600'
              }`}>
                <stat.icon className="text-xl" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <activity.icon />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">{activity.message}</p>
                  <p className="text-slate-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Pending Actions</h2>
          <div className="space-y-4">
            {pendingActions.map((action, index) => (
              <div key={action.title} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                    <action.icon />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{action.title}</p>
                    <p className="text-slate-500 text-sm">Requires your attention</p>
                  </div>
                </div>
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {action.count}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Platform Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Uptime</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Response Time</span>
              <span className="font-semibold text-slate-900">120ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Active Sessions</span>
              <span className="font-semibold text-slate-900">245</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Today's Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">New Users</span>
              <span className="font-semibold text-slate-900">25</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">New Orders</span>
              <span className="font-semibold text-slate-900">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Revenue Today</span>
              <span className="font-semibold text-slate-900">$2,450</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-slate-900 text-white py-2 px-4 rounded-xl font-medium hover:bg-slate-800 transition-colors">
              Verify Chefs
            </button>
            <button className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-xl font-medium hover:border-slate-400 transition-colors">
              View Reports
            </button>
            <button className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-xl font-medium hover:border-slate-400 transition-colors">
              Manage Users
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;