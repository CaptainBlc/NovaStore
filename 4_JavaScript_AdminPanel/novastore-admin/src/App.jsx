import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './context/ProductContext';
import Sidebar    from './components/Sidebar';
import Dashboard  from './pages/Dashboard';
import Products   from './pages/Products';
import AddProduct from './pages/AddProduct';
import Orders     from './pages/Orders';
import Customers  from './pages/Customers';

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-gray-50">
            <Routes>
              <Route path="/"          element={<Dashboard />} />
              <Route path="/products"  element={<Products />} />
              <Route path="/add"       element={<AddProduct />} />
              <Route path="/orders"    element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
            },
          }}
        />
      </BrowserRouter>
    </ProductProvider>
  );
}
