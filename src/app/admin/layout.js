// app/admin/layout.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaShoppingCart,
  FaSignOutAlt,
  FaBell,
  FaSearch
} from 'react-icons/fa';
import { SiCodechef } from "react-icons/si";
import { MdRestaurantMenu } from 'react-icons/md';

const AdminLayout = ({ children }) => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FaTachometerAlt },
    { name: 'Chef Management', href: '/admin/chefs', icon:  SiCodechef},
    { name: 'User Management', href: '/admin/users', icon: FaUsers },
    { name: 'Order Management', href: '/admin/orders', icon: FaShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Permanent Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 h-16 px-4 border-b border-slate-800">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <MdRestaurantMenu className="text-white text-lg" />
          </div>
          <span className="text-white font-bold text-lg">Chef@Home</span>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="text-lg" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex-shrink-0">
          <div className="flex items-center justify-between h-full px-8">
            {/* Page Title */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Search Bar */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent w-64"
                />
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;