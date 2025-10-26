import React, { useState, useMemo } from "react";
import { Sparkles, Search, Shirt, Loader2, ArrowLeft, Heart, Bookmark, ExternalLink } from "lucide-react";

export function OutfitPickerPage() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("likes");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;

    setIsLoading(true);
    setError("");
    setRecommendations(null);
    setSelectedCategory("All");

    try {
      console.log("Form submitted with value:", value);
      let url = process.env.REACT_APP_API_BASE_URL + "/scrape";
      console.log(url);
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: value }),
      });
      console.log(res);

      if (!res.ok) throw new Error("Failed to fetch recommendations");

      let data = await res.json();
      console.log("Response data:", data);
      
      // Extract the items array from the response
      let processedData = data.items ;
      console.log(processedData)
      
      console.log("Processed data:", processedData);
      console.log("Number of items:", Array.isArray(processedData) ? processedData.length : 0);
      
      setRecommendations(processedData);
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

  // Extract unique categories from recommendations
  const categories = useMemo(() => {
    if (!recommendations || !Array.isArray(recommendations)) return [];
    const cats = recommendations.map(r => r.category?.[0] || r.category || "Other");
    return ["All", ...new Set(cats)];
  }, [recommendations]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    if (!recommendations || !Array.isArray(recommendations)) return {};
    const counts = {};
    recommendations.forEach(r => {
      const cat = r.category?.[0] || r.category || "Other";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [recommendations]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!recommendations || !Array.isArray(recommendations)) return [];
    
    let filtered = selectedCategory === "All"
      ? recommendations
      : recommendations.filter(r => {
          const cat = r.category?.[0] || r.category || "Other";
          return cat === selectedCategory;
        });

    return filtered.sort((a, b) => {
      if (sortBy === "likes") return (b.likes || 0) - (a.likes || 0);
      if (sortBy === "saves") return (b.saves || 0) - (a.saves || 0);
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
  }, [recommendations, selectedCategory, sortBy]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-300">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-200 hover:text-white border border-white/20 hover:border-purple-400/50"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Search/Loading View */}
      {(!recommendations || isLoading) && (
        <div className="w-full max-w-5xl mx-auto pt-20 p-4">
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
                      onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
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
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Powered by Gemini + YOLO + Pinterest
          </p>
        </div>
      )}

      {/* Dashboard View */}
      {recommendations && !isLoading && (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Categories</h2>

            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category
                          ? "bg-white/20 text-white"
                          : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {category === "All" 
                        ? (Array.isArray(recommendations) ? recommendations.length : 0)
                        : categoryCounts[category] || 0}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/5 text-white"
              >
                <option value="likes" className="bg-slate-800">Most Liked</option>
                <option value="saves" className="bg-slate-800">Most Saved</option>
                <option value="date" className="bg-slate-800">Newest</option>
              </select>
            </div>

            <button
              onClick={() => {
                setRecommendations(null);
                setSelectedCategory("All");
                setValue("");
              }}
              className="w-full mt-6 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors border border-white/20 hover:border-purple-400/50"
            >
              ← New Search
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-slate-900/50">
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">
                  {selectedCategory === "All" ? "All Items" : selectedCategory}
                </h1>
                <p className="text-gray-400 mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} found
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <div
                    key={product.id || idx}
                    className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 overflow-hidden border border-white/20 hover:border-purple-400/50 hover:scale-105"
                  >
                    <div className="relative aspect-square bg-gray-900">
                      <img
                        src={product.image_url || product.image}
                        alt={product.title || product.keyword}
                        className="w-full h-full object-cover"
                      />
                      {product.style && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                          <span className="text-sm font-medium text-gray-800">{product.style}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2 min-h-[3rem]">
                        {product.title || product.keyword || "Untitled"}
                      </h3>

                      {product.description && (
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {product.creator && (
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                          <span className="font-medium text-gray-300">{product.creator}</span>
                          {product.created_at && (
                            <>
                              <span>•</span>
                              <span>{formatDate(product.created_at)}</span>
                            </>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-white/20">
                        <div className="flex gap-4">
                          {product.likes !== undefined && (
                            <div className="flex items-center gap-1 text-gray-300">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm font-medium">{product.likes}</span>
                            </div>
                          )}
                          {product.saves !== undefined && (
                            <div className="flex items-center gap-1 text-gray-300">
                              <Bookmark className="w-4 h-4" />
                              <span className="text-sm font-medium">{product.saves}</span>
                            </div>
                          )}
                        </div>
                        {product.source_url && (
                          <a
                            href={product.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">No items found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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