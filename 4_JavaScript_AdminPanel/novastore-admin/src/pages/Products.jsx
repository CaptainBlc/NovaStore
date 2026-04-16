import { useState, useMemo } from 'react';
import { useProducts, CATEGORIES } from '../context/ProductContext';
import ProductModal from '../components/ProductModal';
import toast from 'react-hot-toast';

export default function Products() {
  const { products, deleteProduct, toggleStatus } = useProducts();
  const [search,     setSearch]     = useState('');
  const [filterCat,  setFilterCat]  = useState(0);
  const [filterSt,   setFilterSt]   = useState('all');
  const [sortBy,     setSortBy]     = useState('name');
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search)             list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (filterCat)          list = list.filter((p) => p.categoryId === filterCat);
    if (filterSt !== 'all') list = list.filter((p) => p.status === filterSt);
    list.sort((a, b) => {
      if (sortBy === 'price')  return b.price - a.price;
      if (sortBy === 'stock')  return b.stock - a.stock;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [products, search, filterCat, filterSt, sortBy]);

  const handleDelete = (id) => {
    deleteProduct(id);
    setDelConfirm(null);
    toast.success('Urun silindi');
  };

  const openAdd  = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (p) => { setEditTarget(p);   setModalOpen(true); };

  const catName = (id) => CATEGORIES.find((c) => c.id === id)?.name ?? '-';

  return (
    <div className="p-6 space-y-5">
      {/* Başlık */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Urun Yonetimi</h1>
          <p className="text-gray-500 text-sm">{filtered.length} / {products.length} urun gosteriliyor</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <span>➕</span> Yeni Urun Ekle
        </button>
      </div>

      {/* Filtre / Arama */}
      <div className="card !p-4 flex flex-wrap gap-3">
        <input
          className="input-field flex-1 min-w-48"
          placeholder="🔍  Urun ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="input-field w-40" value={filterCat} onChange={(e) => setFilterCat(Number(e.target.value))}>
          <option value={0}>Tum Kategoriler</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="input-field w-36" value={filterSt} onChange={(e) => setFilterSt(e.target.value)}>
          <option value="all">Tum Durumlar</option>
          <option value="active">Aktif</option>
          <option value="inactive">Pasif</option>
        </select>
        <select className="input-field w-36" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Ada Gore</option>
          <option value="price">Fiyata Gore</option>
          <option value="stock">Stoka Gore</option>
          <option value="rating">Puana Gore</option>
        </select>
      </div>

      {/* Tablo */}
      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Urun</th>
                <th className="text-left px-4 py-3.5 text-gray-500 font-semibold">Kategori</th>
                <th className="text-right px-4 py-3.5 text-gray-500 font-semibold">Fiyat</th>
                <th className="text-right px-4 py-3.5 text-gray-500 font-semibold">Stok</th>
                <th className="text-center px-4 py-3.5 text-gray-500 font-semibold">Puan</th>
                <th className="text-center px-4 py-3.5 text-gray-500 font-semibold">Durum</th>
                <th className="text-center px-4 py-3.5 text-gray-500 font-semibold">Islemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <p className="text-3xl mb-2">📦</p>
                    <p>Urun bulunamadi</p>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                    {/* Urun */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || 'https://via.placeholder.com/40'}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                        />
                        <span className="font-medium text-gray-800 truncate max-w-48">{p.name}</span>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="px-4 py-3">
                      <span className="badge bg-indigo-50 text-indigo-700">{catName(p.categoryId)}</span>
                    </td>

                    {/* Fiyat */}
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">
                      {p.price.toLocaleString('tr-TR')} TL
                    </td>

                    {/* Stok */}
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock < 20 ? 'text-orange-500' : 'text-gray-700'}`}>
                        {p.stock}
                      </span>
                    </td>

                    {/* Puan */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-700 font-medium ml-1">{p.rating}</span>
                    </td>

                    {/* Durum */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => { toggleStatus(p.id); toast(`Durum guncellendi`); }}
                        className={`badge cursor-pointer transition-all ${
                          p.status === 'active'
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {p.status === 'active' ? '● Aktif' : '○ Pasif'}
                      </button>
                    </td>

                    {/* Islemler */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Duzenle"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDelConfirm(p.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Sil"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modaller */}
      {modalOpen && (
        <ProductModal
          product={editTarget}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Silme onayı */}
      {delConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <p className="text-4xl mb-3">⚠️</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Emin misiniz?</h3>
            <p className="text-gray-500 text-sm mb-6">Bu urunu silmek istediginizden emin misiniz? Bu islem geri alinamaz.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="btn-secondary flex-1 justify-center">İptal</button>
              <button onClick={() => handleDelete(delConfirm)} className="btn-danger flex-1">Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
