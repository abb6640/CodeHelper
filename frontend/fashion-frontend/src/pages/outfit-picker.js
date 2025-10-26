import React, { useState } from "react";
import { Sparkles, Search, Shirt, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OutfitPickerPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;

    setIsLoading(true);
    setError("");
    setRecommendations(null);

    try {
      console.log("Form submitted with value:", value);
      let url =  process.env.REACT_APP_API_BASE_URL + "/scrape"
      console.log(url)
      let res = await fetch(
       url,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword: value }),
        }
      );
      console.log(res)

      if (!res.ok) throw new Error("Failed to fetch recommendations");

      let data = await res.json();
      console.log("Response data:", data);
      setRecommendations(data);
    } catch (err) {
      setError("Unable to fetch recommendations. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
    if (error) setError("");
  }

  // Extract YOLO categories dynamically
  const categories = recommendations
    ? [...new Set(recommendations.map((r) => r.category))]
    : [];

  const filteredResults = selectedCategory
    ? recommendations.filter((r) => r.category === selectedCategory)
    : recommendations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 transition-all duration-300">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-200 hover:text-white border border-white/20 hover:border-purple-400/50"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="w-full max-w-5xl mx-auto pt-20">
        {/* Header */}
        {!recommendations && !isLoading && (
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mb-4 shadow-lg">
              <Shirt className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Your Style, Curated
            </h1>
            <p className="text-gray-300 text-lg max-w-md mx-auto">
              Describe your desired look and let AI find the perfect outfit for you
            </p>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Input Form */}
          {!recommendations && !isLoading && (
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  What are you looking for today?
                </label>

                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />

                  <input
                    onChange={handleChange}
                    value={value}
                    type="text"
                    placeholder="e.g., playboi carti fits, Y2K beige hoodie..."
                    className="w-full pl-12 pr-4 py-4 text-white bg-white/5 border-2 border-white/10 rounded-2xl focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-200 text-base placeholder-gray-500"
                    disabled={isLoading}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  />
                </div>

                {error && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    {error}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !value.trim()}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Get Recommendations
              </button>

              {/* Quick Tags */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Try these popular styles:</p>
                <div className="flex flex-wrap gap-2">
                  {["Streetwear", "Vintage", "Minimal", "Y2K", "Grunge"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setValue(tag)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full text-sm transition-colors duration-200 border border-white/10 hover:border-purple-400/50"
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in">
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
              <p className="text-lg text-gray-200 font-medium">
                Gemini is curating your style suggestions...
              </p>
              <p className="text-sm text-gray-400">
                (Fetching Pinterest looks and analyzing clothing with YOLO)
              </p>
            </div>
          )}

          {/* Results Section */}
          {recommendations && !isLoading && (
            <div className="space-y-8 animate-fade-in">
              {/* Dropdown */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">
                  Outfit Recommendations
                </h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border border-white/20 rounded-lg text-sm bg-white/10 text-white focus:outline-none focus:border-purple-400 backdrop-blur-sm"
                >
                  <option value="" className="bg-slate-800">All Categories</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-slate-800">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Grid */}
              {filteredResults && filteredResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredResults.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-200 border border-white/20 hover:border-purple-400/50"
                    >
                      <img
                        src={item.image}
                        alt={item.keyword}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-3 text-center">
                        <p className="text-sm font-medium text-gray-200">
                          {item.keyword}
                        </p>
                        <p className="text-xs text-purple-400 uppercase font-semibold mt-1">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">No results found.</p>
              )}

              {/* Back Button */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setRecommendations(null);
                    setSelectedCategory("");
                    setValue("");
                  }}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-full text-sm font-medium transition-colors border border-white/20 hover:border-purple-400/50"
                >
                  ← Start a new search
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Powered by Gemini + YOLO + Pinterest
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}