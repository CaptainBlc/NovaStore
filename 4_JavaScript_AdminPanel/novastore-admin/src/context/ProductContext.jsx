import { createContext, useContext, useReducer, useCallback } from 'react';

// ── Başlangıç verisi ────────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id: 1, categoryId: 1, name: 'Samsung Galaxy S24',      price: 24999, stock: 45,  rating: 4.8, status: 'active',   image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=80' },
  { id: 2, categoryId: 1, name: 'Apple iPhone 15',          price: 39999, stock: 30,  rating: 4.9, status: 'active',   image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80' },
  { id: 3, categoryId: 1, name: 'Logitech MX Master 3',    price: 2899,  stock: 120, rating: 4.7, status: 'active',   image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=80' },
  { id: 4, categoryId: 1, name: 'Sony WH-1000XM5',         price: 7499,  stock: 60,  rating: 4.8, status: 'active',   image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=80' },
  { id: 5, categoryId: 1, name: 'Apple MacBook Air M2',    price: 49999, stock: 20,  rating: 4.9, status: 'active',   image: 'https://images.unsplash.com/photo-1611186871525-09c285193b57?w=80' },
  { id: 6, categoryId: 2, name: 'Nike Air Max 270',        price: 3299,  stock: 85,  rating: 4.6, status: 'active',   image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80' },
  { id: 7, categoryId: 2, name: 'Adidas Essentials Hoodie',price: 1299,  stock: 150, rating: 4.4, status: 'active',   image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80' },
  { id: 8, categoryId: 2, name: "Levi's 501 Original",     price: 1899,  stock: 0,   rating: 4.5, status: 'inactive', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=80' },
  { id: 9, categoryId: 3, name: 'Philips Air Fryer XXL',   price: 4199,  stock: 40,  rating: 4.7, status: 'active',   image: 'https://images.unsplash.com/photo-1648745597483-7abc8d4e1fb3?w=80' },
  { id:10, categoryId: 4, name: 'Decathlon Yoga Mati',     price: 349,   stock: 200, rating: 4.5, status: 'active',   image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=80' },
  { id:11, categoryId: 4, name: 'Wilson Pro Staff Raketi', price: 5999,  stock: 15,  rating: 4.8, status: 'active',   image: 'https://images.unsplash.com/photo-1545809074-59472b3f5ecc?w=80' },
  { id:12, categoryId: 5, name: 'Atomik Aliskanliklar',    price: 179,   stock: 300, rating: 4.9, status: 'active',   image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80' },
  { id:13, categoryId: 5, name: 'Moleskine Defter A5',     price: 349,   stock: 180, rating: 4.6, status: 'active',   image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=80' },
  { id:14, categoryId: 1, name: 'Xiaomi Redmi Note 13',    price: 8999,  stock: 70,  rating: 4.5, status: 'active',   image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=80' },
];

export const CATEGORIES = [
  { id: 1, name: 'Elektronik' },
  { id: 2, name: 'Giyim' },
  { id: 3, name: 'Ev ve Yasam' },
  { id: 4, name: 'Spor' },
  { id: 5, name: 'Kitap' },
];

// ── Reducer ─────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        products: [...state.products, { ...action.payload, id: Date.now() }],
      };
    case 'UPDATE':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case 'TOGGLE_STATUS':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload
            ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
            : p
        ),
      };
    default:
      return state;
  }
}

// ── Context ─────────────────────────────────────────────────────────────────
const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { products: INITIAL_PRODUCTS });

  const addProduct    = useCallback((p) => dispatch({ type: 'ADD',           payload: p }),  []);
  const updateProduct = useCallback((p) => dispatch({ type: 'UPDATE',        payload: p }),  []);
  const deleteProduct = useCallback((id) => dispatch({ type: 'DELETE',       payload: id }), []);
  const toggleStatus  = useCallback((id) => dispatch({ type: 'TOGGLE_STATUS',payload: id }), []);

  const stats = {
    total:    state.products.length,
    active:   state.products.filter((p) => p.status === 'active').length,
    outStock: state.products.filter((p) => p.stock === 0).length,
    revenue:  state.products.reduce((sum, p) => sum + p.price * (p.stock || 0), 0),
  };

  return (
    <ProductContext.Provider value={{ products: state.products, addProduct, updateProduct, deleteProduct, toggleStatus, stats, categories: CATEGORIES }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
