import { useState } from "react";

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("semua");

  // Sample data untuk demonstrasi
  const propertyData = [
    { id: 1, zone: "Tembalang", avgPrice: "750M", growth: "+12%", properties: 45, color: "bg-blue-500" },
    { id: 2, zone: "Banyumanik", avgPrice: "650M", growth: "+8%", properties: 38, color: "bg-green-500" },
    { id: 3, zone: "Pedurungan", avgPrice: "580M", growth: "+15%", properties: 52, color: "bg-purple-500" },
    { id: 4, zone: "Semarang Timur", avgPrice: "720M", growth: "+10%", properties: 41, color: "bg-orange-500" },
    { id: 5, zone: "Candisari", avgPrice: "680M", growth: "+6%", properties: 33, color: "bg-red-500" },
    { id: 6, zone: "Gajahmungkur", avgPrice: "620M", growth: "+9%", properties: 29, color: "bg-indigo-500" },
  ];

  const trendData = [
    { month: "Jan", price: 580 },
    { month: "Feb", price: 590 },
    { month: "Mar", price: 610 },
    { month: "Apr", price: 625 },
    { month: "Mei", price: 640 },
    { month: "Jun", price: 665 },
    { month: "Jul", price: 680 },
    { month: "Agu", price: 695 },
    { month: "Sep", price: 720 },
    { month: "Okt", price: 735 },
    { month: "Nov", price: 750 },
    { month: "Des", price: 768 },
  ];

  const filters = [
    { id: "semua", label: "Semua Zona", count: propertyData.length },
    { id: "tinggi", label: "Harga Tinggi (>700M)", count: 3 },
    { id: "sedang", label: "Harga Sedang (600-700M)", count: 2 },
    { id: "rendah", label: "Harga Rendah (<600M)", count: 1 },
  ];

  const getFilteredData = () => {
    if (activeFilter === "semua") return propertyData;
    if (activeFilter === "tinggi") return propertyData.filter(item => parseInt(item.avgPrice) > 700);
    if (activeFilter === "sedang") return propertyData.filter(item => parseInt(item.avgPrice) >= 600 && parseInt(item.avgPrice) <= 700);
    if (activeFilter === "rendah") return propertyData.filter(item => parseInt(item.avgPrice) < 600);
    return propertyData;
  };

  return (
    <div className="w-full overflow-x-hidden bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Eksplorasi Data Properti
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Jelajahi tren harga dan analisis zona properti di Semarang dengan visualisasi data yang komprehensif
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Overview */}
      <section className="py-12 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-green-500 text-sm font-semibold">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">8900</h3>
              <p className="text-gray-600">Total Properti</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-green-500 text-sm font-semibold">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">685M</h3>
              <p className="text-gray-600">Rata-rata Harga</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-blue-500 text-sm font-semibold">6 Zona</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">24</h3>
              <p className="text-gray-600">Kecamatan</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-green-500 text-sm font-semibold">Trending</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">+10%</h3>
              <p className="text-gray-600">Pertumbuhan YoY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Trend Chart */}
      <section className="py-12 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tren Harga Properti 2024</h2>
            <p className="text-gray-600">Perkembangan harga rata-rata properti di Semarang sepanjang tahun</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border">
            <div className="relative h-80">
              <svg className="w-full h-full" viewBox="0 0 800 300">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="66.67" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 66.67 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="800" height="300" fill="url(#grid)" />
                
                {/* Chart line */}
                <polyline
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  points={trendData.map((item, index) => 
                    `${(index * 66.67) + 50},${300 - ((item.price - 500) / 300 * 250)}`
                  ).join(' ')}
                />
                
                {/* Data points */}
                {trendData.map((item, index) => (
                  <g key={index}>
                    <circle
                      cx={(index * 66.67) + 50}
                      cy={300 - ((item.price - 500) / 300 * 250)}
                      r="4"
                      fill="#3b82f6"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                    <text
                      x={(index * 66.67) + 50}
                      y={290}
                      textAnchor="middle"
                      className="text-xs fill-gray-600"
                    >
                      {item.month}
                    </text>
                  </g>
                ))}
                
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Zone Analysis */}
      <section className="py-12 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analisis Zona Properti</h2>
            <p className="text-gray-600">Perbandingan harga dan pertumbuhan properti berdasarkan zona di Semarang</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Zone Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredData().map((zone) => (
              <div key={zone.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className={`h-2 ${zone.color}`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{zone.zone}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {zone.growth}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Harga Rata-rata</span>
                      <span className="text-2xl font-bold text-gray-900">{zone.avgPrice}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Jumlah Properti</span>
                      <span className="text-lg font-semibold text-blue-600">{zone.properties}</span>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Popularitas</span>
                        <span className="text-sm font-semibold">{Math.round((zone.properties / 60) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${zone.color}`}
                          style={{ width: `${(zone.properties / 60) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-12 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Wawasan Pasar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Analisis mendalam tentang kondisi pasar properti Semarang berdasarkan data terkini
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Market Trend */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Tren Pasar</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700">Pertumbuhan harga konsisten 10% year-over-year</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700">Zona Tembalang menunjukkan pertumbuhan tertinggi</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700">Demand tinggi untuk properti dekat kampus</span>
                </li>
              </ul>
            </div>

            {/* Investment Recommendations */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Rekomendasi</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700">Pedurungan cocok untuk investasi jangka panjang</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700">Banyumanik stabil untuk hunian keluarga</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2"></span>
                  <span className="text-gray-700">Semarang Timur mengalami gentrification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}