import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, CATEGORIES } from '../context/ProductContext';
import toast from 'react-hot-toast';

const EMPTY = { name: '', categoryId: 1, price: '', stock: '', rating: '4.5', status: 'active', image: '' };

export default function AddProduct() {
  const { addProduct } = useProducts();
  const navigate       = useNavigate();
  const [form, setForm]   = useState(EMPTY);
  const [errors, setErrs] = useState({});

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())                         e.name  = 'Urun adi zorunludur';
    if (!form.price || Number(form.price) <= 0)    e.price = 'Gecerli bir fiyat girin';
    if (form.stock === '' || Number(form.stock) < 0) e.stock = 'Stok 0 veya uzeri olmalidir';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addProduct({
      ...form,
      categoryId: Number(form.categoryId),
      price:      Number(form.price),
      stock:      Number(form.stock),
      rating:     Number(form.rating),
    });
    toast.success(`"${form.name}" basariyla eklendi!`);
    navigate('/products');
  };

  const preview = form.image || null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yeni Urun Ekle</h1>
        <p className="text-gray-500 text-sm mt-1">NovaStore katalogunuza yeni bir urun ekleyin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Gorsel onizleme */}
        <div className="card flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            {preview ? (
              <img src={preview} alt="onizleme" className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display='none'; }} />
            ) : (
              <span className="text-3xl">🖼️</span>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gorsel URL</label>
            <input className="input-field" value={form.image} onChange={set('image')}
              placeholder="https://example.com/image.jpg" />
            <p className="text-xs text-gray-400 mt-1">Gorseli URL olarak girin, sol tarafta onizleme gosterilir</p>
          </div>
        </div>

        {/* Ana bilgiler */}
        <div className="card space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Temel Bilgiler</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urun Adi *</label>
            <input className={`input-field ${errors.name ? 'border-red-400' : ''}`}
              value={form.name} onChange={set('name')} placeholder="ornek: Samsung Galaxy S25" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select className="input-field" value={form.categoryId} onChange={set('categoryId')}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL) *</label>
              <input type="number" min="0" className={`input-field ${errors.price ? 'border-red-400' : ''}`}
                value={form.price} onChange={set('price')} placeholder="0" />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stok Adedi *</label>
              <input type="number" min="0" className={`input-field ${errors.stock ? 'border-red-400' : ''}`}
                value={form.stock} onChange={set('stock')} placeholder="0" />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Baslanggic Puani</label>
              <input type="number" min="1" max="5" step="0.1" className="input-field"
                value={form.rating} onChange={set('rating')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
              <select className="input-field" value={form.status} onChange={set('status')}>
                <option value="active">Aktif (Satista)</option>
                <option value="inactive">Pasif (Gizli)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/products')} className="btn-secondary flex-1 justify-center py-3">
            İptal
          </button>
          <button type="submit" className="btn-primary flex-1 justify-center py-3">
            ✅ Urunu Ekle
          </button>
        </div>
      </form>
    </div>
  );
}
