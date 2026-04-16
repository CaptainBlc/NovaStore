const CUSTOMERS = [
  { id: 1,  name: 'Ahmet Yilmaz',  email: 'ahmet.yilmaz@email.com',  city: 'Istanbul', orders: 2, total: 32446 },
  { id: 2,  name: 'Zeynep Kaya',   email: 'zeynep.kaya@email.com',   city: 'Ankara',   orders: 2, total: 28298 },
  { id: 3,  name: 'Mehmet Demir',  email: 'mehmet.demir@email.com',  city: 'Izmir',    orders: 2, total: 47498 },
  { id: 4,  name: 'Ayse Celik',    email: 'ayse.celik@email.com',    city: 'Antalya',  orders: 2, total: 30997 },
  { id: 5,  name: 'Emre Sahin',    email: 'emre.sahin@email.com',    city: 'Bursa',    orders: 2, total: 52897 },
  { id: 6,  name: 'Fatma Arslan',  email: 'fatma.arslan@email.com',  city: 'Adana',    orders: 1, total: 8999 },
  { id: 7,  name: 'Can Ozturk',    email: 'can.ozturk@email.com',    city: 'Konya',    orders: 1, total: 2199 },
  { id: 8,  name: 'Merve Dogan',   email: 'merve.dogan@email.com',   city: 'Samsun',   orders: 1, total: 1299 },
  { id: 9,  name: 'Burak Aydin',   email: 'burak.aydin@email.com',   city: 'Manisa',   orders: 1, total: 3648 },
  { id: 10, name: 'Selin Ozkan',   email: 'selin.ozkan@email.com',   city: 'Konya',    orders: 1, total: 7149 },
];

export default function Customers() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Musteri Yonetimi</h1>
        <p className="text-gray-500 text-sm mt-1">{CUSTOMERS.length} kayitli musteri</p>
      </div>

      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['#', 'Musteri', 'E-posta', 'Sehir', 'Siparis', 'Toplam Harcama'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-gray-500 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CUSTOMERS.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-400 font-medium">{c.id}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center text-white text-xs font-bold">
                        {c.name[0]}
                      </div>
                      <span className="font-medium text-gray-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{c.email}</td>
                  <td className="px-5 py-3">
                    <span className="badge bg-gray-100 text-gray-600">{c.city}</span>
                  </td>
                  <td className="px-5 py-3 text-center font-semibold text-gray-700">{c.orders}</td>
                  <td className="px-5 py-3 font-bold text-accent-500">
                    {c.total.toLocaleString('tr-TR')} TL
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
