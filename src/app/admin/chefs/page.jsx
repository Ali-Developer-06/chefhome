// app/admin/chefs/page.jsx
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
  FaUserTimes
} from 'react-icons/fa';
import { MdPendingActions, MdVerified } from 'react-icons/md';

const ChefManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [chefs, setChefs] = useState([
    {
      id: 1,
      name: 'Marco Bellucci',
      email: 'marco@chefathome.com',
      specialty: 'Italian Cuisine',
      status: 'verified',
      joinDate: '2024-01-15',
      totalOrders: 45,
      rating: 4.9,
      phone: '+1 (555) 123-4567',
      location: 'New York, NY'
    },
    {
      id: 2,
      name: 'Sophie Laurent',
      email: 'sophie@chefathome.com',
      specialty: 'French Patisserie',
      status: 'verified',
      joinDate: '2024-02-20',
      totalOrders: 32,
      rating: 4.8,
      phone: '+1 (555) 123-4568',
      location: 'Los Angeles, CA'
    },
    {
      id: 3,
      name: 'Kenji Tanaka',
      email: 'kenji@chefathome.com',
      specialty: 'Japanese Sushi',
      status: 'pending',
      joinDate: '2024-03-10',
      totalOrders: 0,
      rating: 0,
      phone: '+1 (555) 123-4569',
      location: 'San Francisco, CA'
    },
    {
      id: 4,
      name: 'Isabella Rossi',
      email: 'isabella@chefathome.com',
      specialty: 'Mediterranean',
      status: 'verified',
      joinDate: '2024-01-28',
      totalOrders: 28,
      rating: 4.7,
      phone: '+1 (555) 123-4570',
      location: 'Miami, FL'
    },
    {
      id: 5,
      name: 'Carlos Mendez',
      email: 'carlos@chefathome.com',
      specialty: 'Mexican & Latin',
      status: 'suspended',
      joinDate: '2024-02-15',
      totalOrders: 12,
      rating: 4.2,
      phone: '+1 (555) 123-4571',
      location: 'Austin, TX'
    },
    {
      id: 6,
      name: 'Priya Sharma',
      email: 'priya@chefathome.com',
      specialty: 'Indian Cuisine',
      status: 'verified',
      joinDate: '2024-01-10',
      totalOrders: 38,
      rating: 4.8,
      phone: '+1 (555) 123-4572',
      location: 'Chicago, IL'
    }
  ]);

  const filteredChefs = chefs.filter(chef => {
    const matchesSearch = chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chef.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chef.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || chef.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const verifyChef = (chefId) => {
    setChefs(chefs.map(chef => 
      chef.id === chefId ? { ...chef, status: 'verified' } : chef
    ));
  };

  const suspendChef = (chefId) => {
    setChefs(chefs.map(chef => 
      chef.id === chefId ? { ...chef, status: 'suspended' } : chef
    ));
  };

  const deleteChef = (chefId) => {
    setChefs(chefs.filter(chef => chef.id !== chefId));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { color: 'bg-green-100 text-green-800', icon: MdVerified },
      pending: { color: 'bg-amber-100 text-amber-800', icon: MdPendingActions },
      suspended: { color: 'bg-red-100 text-red-800', icon: FaUserTimes }
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Chef Management</h1>
        <p className="text-slate-600">Manage and monitor all chefs on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Chefs</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{chefs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <FaUserCheck className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Verified</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {chefs.filter(c => c.status === 'verified').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <MdVerified className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {chefs.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
              <MdPendingActions className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Suspended</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {chefs.filter(c => c.status === 'suspended').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
              <FaUserTimes className="text-xl" />
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
                placeholder="Search chefs by name, email, or specialty..."
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
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chefs Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Chef
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredChefs.map((chef) => (
                <motion.tr
                  key={chef.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-slate-900">{chef.name}</div>
                      <div className="text-sm text-slate-500">{chef.email}</div>
                      <div className="text-sm text-slate-500">{chef.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-slate-900 font-medium">{chef.specialty}</span>
                    <div className="text-sm text-slate-500">{chef.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(chef.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-slate-900 font-medium">{chef.totalOrders}</span>
                    <div className="text-sm text-slate-500">orders</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-medium">{chef.rating}</span>
                      {chef.rating > 0 && (
                        <div className="flex text-amber-400">
                          {'★'.repeat(Math.floor(chef.rating))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <FaEye />
                      </button>
                      
                      {chef.status === 'pending' && (
                        <button 
                          onClick={() => verifyChef(chef.id)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Verify Chef"
                        >
                          <FaCheck />
                        </button>
                      )}
                      
                      {chef.status === 'verified' && (
                        <button 
                          onClick={() => suspendChef(chef.id)}
                          className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Suspend Chef"
                        >
                          <FaUserTimes />
                        </button>
                      )}
                      
                      {chef.status === 'suspended' && (
                        <button 
                          onClick={() => verifyChef(chef.id)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Re-activate Chef"
                        >
                          <FaUserCheck />
                        </button>
                      )}
                      
                      <button 
                        onClick={() => deleteChef(chef.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Chef"
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
        {filteredChefs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserTimes className="text-3xl text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No chefs found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefManagement;