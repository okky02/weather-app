export default function Header({
  city,
  setCity,
  handleSearch,
  handleKeyPress,
  loading,
  error,
}) {
  return (
    <header className="w-full max-w-6xl mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg flex items-center gap-2">
            <span className="text-yellow-300">⛅</span> Ramalan Cuaca
          </h1>
          <p className="text-blue-100 mt-1 flex items-center justify-center md:justify-start">
            Dapatkan informasi cuaca terkini
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Cari lokasi..."
            className="flex-1 rounded-xl px-4 py-3 text-gray-100 ring-1 focus:ring-2 focus:ring-white outline-none shadow-lg"
            id="city-search"
            name="city"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-gray-500 hover:bg-gray-600 transition px-5 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Cari</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Cari</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/80 backdrop-blur-sm text-white text-center p-4 rounded-xl shadow-md animate-fadeIn mb-4">
          ⚠️ {error}
        </div>
      )}
    </header>
  );
}
