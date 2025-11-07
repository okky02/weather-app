export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="mb-6">
      <div className="flex border-b border-white/20">
        <button
          className={`px-4 py-2 font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "today"
              ? "text-white border-b-2 border-white bg-white/10 rounded-t-lg"
              : "text-blue-200 hover:text-white hover:bg-white/10 rounded-t-lg"
          }`}
          onClick={() => setActiveTab("today")}
        >
          Hari Ini
        </button>
        <button
          className={`px-4 py-2 font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "week"
              ? "text-white border-b-2 border-white bg-white/10 rounded-t-lg"
              : "text-blue-200 hover:text-white hover:bg-white/10 rounded-t-lg"
          }`}
          onClick={() => setActiveTab("week")}
        >
          7 Hari ke Depan
        </button>
      </div>
    </div>
  );
}
