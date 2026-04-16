import { useState, useEffect } from 'react';
import { useProducts, CATEGORIES } from '../context/ProductContext';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
  name: '', categoryId: 1, price: '', stock: '',
  rating: '4.5', status: 'active', image: '',
};

export default function ProductModal({ product, onClose }) {
  const { addProduct, updateProduct } = useProducts();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(product);

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        price: String(product.price),
        stock: String(product.stock),
        rating: String(product.rating),
      });
    }
  }, [product]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())      e.name  = 'Urun adi zorunludur';
    if (!form.price || Number(form.price) <= 0) e.price = 'Gecerli bir fiyat girin';
    if (form.stock === '' || Number(form.stock) < 0) e.stock = 'Stok 0 veya uzeri olmalidir';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      categoryId: Number(form.categoryId),
      price:      Number(form.price),
      stock:      Number(form.stock),
      rating:     Number(form.rating),
    };

    if (isEdit) {
      updateProduct(payload);
      toast.success('Urun basariyla guncellendi!');
    } else {
      addProduct(payload);
      toast.success('Urun basariyla eklendi!');
    }
    onClose();
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Başlık */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {isEdit ? '✏️ Urun Duzenle' : '➕ Yeni Urun Ekle'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Urun Adı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urun Adi *</label>
            <input
              className={`input-field ${errors.name ? 'border-red-400 ring-1 ring-red-400' : ''}`}
              value={form.name}
              onChange={handleChange('name')}
              placeholder="ornek: Samsung Galaxy S25"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              className="input-field"
              value={form.categoryId}
              onChange={handleChange('categoryId')}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Fiyat + Stok */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL) *</label>
              <input
                type="number"
                min="0"
                className={`input-field ${errors.price ? 'border-red-400' : ''}`}
                value={form.price}
                onChange={handleChange('price')}
                placeholder="0"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stok Adedi *</label>
              <input
                type="number"
                min="0"
                className={`input-field ${errors.stock ? 'border-red-400' : ''}`}
                value={form.stock}
                onChange={handleChange('stock')}
                placeholder="0"
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>

          {/* Puan + Durum */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puan (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                className="input-field"
                value={form.rating}
                onChange={handleChange('rating')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
              <select
                className="input-field"
                value={form.status}
                onChange={handleChange('status')}
              >
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>
          </div>

          {/* Gorsel URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gorsel URL</label>
            <input
              className="input-field"
              value={form.image}
              onChange={handleChange('image')}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Butonlar */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
              İptal
            </button>
            <button type="submit" className="btn-primary flex-1 justify-center">
              {isEdit ? 'Guncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
