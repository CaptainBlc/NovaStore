const MOCK_ORDERS = [
  { id: 1001, customer: 'Ahmet Yilmaz',  date: '05.01.2026', total: 27898, status: 'Teslim Edildi', items: 2 },
  { id: 1002, customer: 'Zeynep Kaya',   date: '12.01.2026', total: 3299,  status: 'Teslim Edildi', items: 1 },
  { id: 1003, customer: 'Mehmet Demir',  date: '20.01.2026', total: 7499,  status: 'Teslim Edildi', items: 1 },
  { id: 1004, customer: 'Ayse Celik',    date: '03.02.2026', total: 5998,  status: 'Teslim Edildi', items: 3 },
  { id: 1005, customer: 'Emre Sahin',    date: '14.02.2026', total: 49999, status: 'Teslim Edildi', items: 1 },
  { id: 1006, customer: 'Ahmet Yilmaz',  date: '28.02.2026', total: 4548,  status: 'Kargoda',       items: 4 },
  { id: 1007, customer: 'Fatma Arslan',  date: '05.03.2026', total: 8999,  status: 'Onaylandi',     items: 1 },
  { id: 1008, customer: 'Can Ozturk',    date: '10.03.2026', total: 2199,  status: 'Beklemede',     items: 2 },
  { id: 1009, customer: 'Zeynep Kaya',   date: '15.03.2026', total: 24999, status: 'Onaylandi',     items: 1 },
  { id: 1010, customer: 'Merve Dogan',   date: '22.03.2026', total: 1299,  status: 'Beklemede',     items: 1 },
  { id: 1011, customer: 'Mehmet Demir',  date: '01.04.2026', total: 39999, status: 'Onaylandi',     items: 1 },
  { id: 1012, customer: 'Burak Aydin',   date: '05.04.2026', total: 3648,  status: 'Beklemede',     items: 4 },
  { id: 1013, customer: 'Selin Ozkan',   date: '08.04.2026', total: 7149,  status: 'Beklemede',     items: 2 },
  { id: 1014, customer: 'Ayse Celik',    date: '10.04.2026', total: 24999, status: 'Kargoda',       items: 1 },
  { id: 1015, customer: 'Emre Sahin',    date: '12.04.2026', total: 2898,  status: 'Beklemede',     items: 2 },
];

const statusStyle = {
  'Teslim Edildi': 'bg-green-50 text-green-700',
  'Kargoda':       'bg-blue-50 text-blue-700',
  'Onaylandi':     'bg-indigo-50 text-indigo-700',
  'Beklemede':     'bg-yellow-50 text-yellow-700',
  'Iptal':         'bg-red-50 text-red-600',
};

export default function Orders() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Siparis Yonetimi</h1>
        <p className="text-gray-500 text-sm mt-1">{MOCK_ORDERS.length} siparis listeleniyor</p>
      </div>

      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Siparis No', 'Musteri', 'Tarih', 'Urun Sayisi', 'Toplam', 'Durum', 'Islem'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-gray-500 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_ORDERS.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono font-semibold text-primary-800">#{o.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{o.customer}</td>
                  <td className="px-5 py-3 text-gray-500">{o.date}</td>
                  <td className="px-5 py-3 text-gray-700 text-center">{o.items}</td>
                  <td className="px-5 py-3 font-bold text-gray-800">{o.total.toLocaleString('tr-TR')} TL</td>
                  <td className="px-5 py-3">
                    <span className={`badge ${statusStyle[o.status] || 'bg-gray-100 text-gray-600'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-xs text-primary-800 hover:underline font-medium">Detay</button>
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
