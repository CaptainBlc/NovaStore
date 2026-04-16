import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/',         icon: '📊', label: 'Dashboard' },
  { to: '/products', icon: '📦', label: 'Urunler' },
  { to: '/add',      icon: '➕', label: 'Urun Ekle' },
  { to: '/orders',   icon: '🛒', label: 'Siparisler' },
  { to: '/customers',icon: '👥', label: 'Musteriler' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-primary-800 flex flex-col shadow-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-primary-700">
        <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
          N
        </div>
        <div>
          <p className="text-white font-bold text-lg leading-none">NovaStore</p>
          <p className="text-primary-100 text-xs mt-0.5">Admin Paneli</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-primary-200 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-primary-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            BT
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">Batuhan Tasdemir</p>
            <p className="text-primary-300 text-xs mt-0.5">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
