import { useState } from 'react';

export default function PredictPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    lokasi: '',
    luas_tanah: '',
    luas_bangunan: '',
    kamar_tidur: '',
    kamar_mandi: '',
    jumlah_lantai: '',
    carport: '',
    daya_listrik: '',
    kondisi_properti: '',
    kondisi_perabotan: ''
  });

  const tabs = [
    { id: 0, title: 'Fisik Properti', icon: '🏠' },
    { id: 1, title: 'Kondisi', icon: '⭐' },
    { id: 2, title: 'Zona', icon: '📍' }
  ];

  const kondisiPropertiOptions = ['Bagus', 'Baik', 'Butuh Renovasi'];
  const kondisiPerabotanOptions = ['Furnished', 'Semi Furnished', 'Unfurnished'];
  const zonaOptions = [
    'Semarang Barat',
    'Semarang Selatan', 
    'Semarang Tengah',
    'Semarang Timur',
    'Semarang Utara'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.lokasi) {
      errors.push('Zona lokasi harus dipilih');
    }
    
    if (!formData.luas_tanah || parseFloat(formData.luas_tanah) <= 0) {
      errors.push('Luas tanah harus lebih dari 0');
    }
    
    if (!formData.luas_bangunan || parseFloat(formData.luas_bangunan) <= 0) {
      errors.push('Luas bangunan harus lebih dari 0');
    }
    
    if (!formData.kamar_tidur || parseInt(formData.kamar_tidur) <= 0) {
      errors.push('Jumlah kamar tidur harus lebih dari 0');
    }
    
    if (!formData.kamar_mandi || parseInt(formData.kamar_mandi) <= 0) {
      errors.push('Jumlah kamar mandi harus lebih dari 0');
    }
    
    if (!formData.jumlah_lantai || parseInt(formData.jumlah_lantai) <= 0) {
      errors.push('Jumlah lantai harus lebih dari 0');
    }
    
    if (!formData.carport || parseInt(formData.carport) < 0) {
      errors.push('Jumlah carport tidak boleh negatif');
    }
    
    if (!formData.daya_listrik || parseInt(formData.daya_listrik) <= 0) {
      errors.push('Daya listrik harus lebih dari 0');
    }
    
    if (!formData.kondisi_properti) {
      errors.push('Kondisi properti harus dipilih');
    }
    
    if (!formData.kondisi_perabotan) {
      errors.push('Kondisi perabotan harus dipilih');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setIsLoading(true);
    setError('');
    setPrediction(null);

    try {
      // Prepare payload according to FastAPI backend structure
      const payload = {
        lokasi: formData.lokasi,
        kamar_tidur: parseInt(formData.kamar_tidur),
        kamar_mandi: parseInt(formData.kamar_mandi),
        luas_tanah: parseFloat(formData.luas_tanah),
        luas_bangunan: parseFloat(formData.luas_bangunan),
        carport: parseInt(formData.carport),
        daya_listrik: parseInt(formData.daya_listrik),
        jumlah_lantai: parseInt(formData.jumlah_lantai),
        kondisi_properti: formData.kondisi_properti,
        kondisi_perabotan: formData.kondisi_perabotan
      };

      console.log('Sending payload:', payload);

      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });


      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.detail || 'Terjadi kesalahan saat prediksi');
      }

      setPrediction(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Terjadi kesalahan saat menghubungi server');
    } finally {
      setIsLoading(false);
    }
  };

  const nextTab = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luas Tanah (m²) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.luas_tanah}
                  onChange={(e) => handleInputChange('luas_tanah', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: 120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luas Bangunan (m²) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.luas_bangunan}
                  onChange={(e) => handleInputChange('luas_bangunan', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: 100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kamar Tidur *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.kamar_tidur}
                  onChange={(e) => handleInputChange('kamar_tidur', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kamar Mandi *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.kamar_mandi}
                  onChange={(e) => handleInputChange('kamar_mandi', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Lantai *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.jumlah_lantai}
                  onChange={(e) => handleInputChange('jumlah_lantai', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carport *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.carport}
                  onChange={(e) => handleInputChange('carport', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daya Listrik (Watt) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.daya_listrik}
                onChange={(e) => handleInputChange('daya_listrik', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: 1300"
              />
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kondisi Properti *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {kondisiPropertiOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleInputChange('kondisi_properti', option)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.kondisi_properti === option
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {option === 'Bagus' ? '⭐' : option === 'Baik' ? '👍' : '🔧'}
                      </div>
                      <div className="font-medium">{option}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kondisi Perabotan *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {kondisiPerabotanOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleInputChange('kondisi_perabotan', option)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.kondisi_perabotan === option
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {option === 'Furnished' ? '🛋️' : option === 'Semi Furnished' ? '🏠' : '🔳'}
                      </div>
                      <div className="font-medium">{option}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Zona Lokasi *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {zonaOptions.map((zona) => (
                  <div
                    key={zona}
                    onClick={() => handleInputChange('lokasi', zona)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.lokasi === zona
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">📍</div>
                      <div className="font-medium">{zona}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            🏡 Estimasi Harga Properti
          </h2>
          <p className="text-gray-600 text-lg">
            Masukkan detail properti Anda untuk mendapatkan estimasi harga yang akurat
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-xl">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {renderTabContent()}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-600 mr-2">⚠️</span>
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            {/* Navigation and Submit */}
            <div className="mt-8 flex justify-between items-center">
              <button
                type="button"
                onClick={prevTab}
                disabled={activeTab === 0}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ← Sebelumnya
              </button>

              {activeTab < tabs.length - 1 ? (
                <button
                  type="button"
                  onClick={nextTab}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Selanjutnya →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-2 rounded-lg font-medium transition-colors ${
                    isLoading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Memproses...</span>
                    </div>
                  ) : (
                    '🚀 Prediksi Harga'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 md:p-8 border border-green-200">
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Hasil Estimasi Harga
              </h3>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {prediction.predicted_price_formatted || `Rp ${prediction.predicted_price?.toLocaleString('id-ID')}`}
              </div>
              
              {/* Additional prediction info */}
              {prediction.predicted_price_miliar && (
                <div className="text-lg text-gray-600 mb-2">
                  (~{prediction.predicted_price_miliar} Miliar)
                </div>
              )}
              
              {prediction.confidence_interval && (
                <div className="text-sm text-gray-500 mb-4">
                  Rentang: {prediction.confidence_interval}
                </div>
              )}
              
              {prediction.property_category && (
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Kategori: {prediction.property_category}
                </div>
              )}
              
              <p className="text-gray-600 mb-6">
                Estimasi harga berdasarkan data properti yang Anda masukkan
              </p>
              
              {/* Property Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/70 rounded-lg p-3 border">
                  <div className="font-medium text-gray-700">Luas Tanah</div>
                  <div className="text-blue-600 font-semibold">{formData.luas_tanah} m²</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3 border">
                  <div className="font-medium text-gray-700">Luas Bangunan</div>
                  <div className="text-blue-600 font-semibold">{formData.luas_bangunan} m²</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3 border">
                  <div className="font-medium text-gray-700">Kamar</div>
                  <div className="text-blue-600 font-semibold">{formData.kamar_tidur}KT/{formData.kamar_mandi}KM</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3 border">
                  <div className="font-medium text-gray-700">Zona</div>
                  <div className="text-blue-600 font-semibold">{formData.lokasi}</div>
                </div>
              </div>
              
              {/* Additional details */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/70 rounded-lg p-3 border">
                  <div className="font-medium text-gray-700">Lantai</div>
                  <div className="text-blue-600">{formData.jumlah_lantai}</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3 border">
                  <div className="font-medium text-gray-700">Carport</div>
                  <div className="text-blue-600">{formData.carport}</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3 border">
                  <div className="font-medium text-gray-700">Daya Listrik</div>
                  <div className="text-blue-600">{formData.daya_listrik}W</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}