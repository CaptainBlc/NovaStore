import { useProducts, CATEGORIES } from '../context/ProductContext';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#1A237E', '#3949AB', '#FF6D00', '#4CAF50', '#F44336'];

export default function Dashboard() {
  const { products, stats } = useProducts();

  const categoryData = CATEGORIES.map((cat) => ({
    name: cat.name,
    urun: products.filter((p) => p.categoryId === cat.id).length,
    stok: products.filter((p) => p.categoryId === cat.id).reduce((s, p) => s + p.stock, 0),
  }));

  const pieData = CATEGORIES.map((cat) => ({
    name: cat.name,
    value: products.filter((p) => p.categoryId === cat.id).length,
  })).filter((d) => d.value > 0);

  const topProducts = [...products]
    .sort((a, b) => b.price * b.stock - a.price * a.stock)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">NovaStore genel bakis</p>
      </div>

      {/* Stat kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Toplam Urun" value={stats.total}   icon="📦" color="blue"   sub="Tum kategoriler" />
        <StatCard title="Aktif Urun"  value={stats.active}  icon="✅" color="green"  sub="Satista olan urunler" />
        <StatCard title="Stok Tukendi" value={stats.outStock} icon="⚠️" color="red" sub="Acil stok gerekli" />
        <StatCard
          title="Envanter Degeri"
          value={`${(stats.revenue / 1000).toFixed(0)}K TL`}
          icon="💰"
          color="indigo"
          sub="Toplam stok x fiyat"
        />
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="card xl:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-4">Kategori Bazli Urun ve Stok Dagilimi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="urun" name="Urun Sayisi" fill="#1A237E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="stok" name="Toplam Stok" fill="#FF6D00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Kategori Paylari</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top ürünler */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4">En Degerli Stok (Fiyat x Stok)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">#</th>
                <th className="text-left py-2 text-gray-500 font-medium">Urun</th>
                <th className="text-right py-2 text-gray-500 font-medium">Fiyat</th>
                <th className="text-right py-2 text-gray-500 font-medium">Stok</th>
                <th className="text-right py-2 text-gray-500 font-medium">Toplam Deger</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-gray-400 font-medium">{i + 1}</td>
                  <td className="py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="py-3 text-right text-gray-700">{p.price.toLocaleString('tr-TR')} TL</td>
                  <td className="py-3 text-right text-gray-700">{p.stock}</td>
                  <td className="py-3 text-right font-bold text-accent-500">
                    {(p.price * p.stock).toLocaleString('tr-TR')} TL
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
