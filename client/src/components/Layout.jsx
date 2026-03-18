import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiActivity, FiUser, FiPhone, FiLogOut, FiMenu, FiX, FiHeart, FiShield } from 'react-icons/fi';

const navItems = [
  { to: '/', icon: FiHome, label: 'Dashboard' },
  { to: '/neuro-tests', icon: FiActivity, label: 'Neuro Tests' },
  { to: '/doctors', icon: FiHeart, label: 'Doctors' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
  { to: '/emergency-contacts', icon: FiPhone, label: 'Emergency' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-white/40 shadow-xl flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {/* Heart-Brain Logo */}
                <path d="M12 21C12 21 4 15 4 9C4 6.5 6 4.5 8.5 4.5C10 4.5 11.5 5.5 12 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="rgba(255,255,255,0.3)"/>
                <path d="M12 6.5C12.5 5.5 14 4.5 15.5 4.5C16.5 4.5 17.4 4.9 18 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M18 5.5C19.2 6.7 20 8.5 18 11C16 13.5 14 15.5 12 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Brain squiggles on right */}
                <path d="M14 8C15 7.5 16.5 8 16 9.5C15.5 11 14 10.5 14.5 9" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                <path d="M15 11C16 11 17 12 16 13C15 14 14 13 14.5 12" stroke="white" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">Inner Bliss</h1>
              <p className="text-xs text-gray-400">Mental Wellness</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-4 pb-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-2">
              <FiShield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                This app does not provide medical diagnosis. Please consult a professional for serious concerns.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-lg border-b border-white/40 px-6 py-4 flex items-center gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 hover:text-primary-600">
            <FiMenu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">Inner Bliss</h1>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
