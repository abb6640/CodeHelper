import React, { useState } from "react";
import { Sparkles, Search, Shirt } from "lucide-react";

export function OutfitPickerPage() {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            console.log("Form submitted with value:", value);
            let res = await fetch(process.env.REACT_APP_API_BASE_URL + "/scrape", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ keyword: value })
            });
            
            if (!res.ok) throw new Error("Failed to fetch recommendations");
            
            let data = await res.json();
            console.log("Response data:", data);
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

    function handleKeyPress(e) {
        if (e.key === 'Enter' && !isLoading && value.trim()) {
            handleSubmit(e);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Header Section */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full mb-4 shadow-lg">
                        <Shirt className="w-10 h-10 text-white" />
                    </div>
                    
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Your Style, Curated
                    </h1>
                    
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Describe your desired look and let AI find the perfect outfit for you
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                    <div className="space-y-6">
                        {/* Input Section */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                What are you looking for today?
                            </label>
                            
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                
                                <input
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    value={value}
                                    type="text"
                                    placeholder="e.g., casual summer dress, formal business attire..."
                                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-200 text-base"
                                    disabled={isLoading}
                                />
                            </div>
                            
                            {error && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !value.trim()}
                            className="w-full bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Finding Your Style...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Get Recommendations
                                </>
                            )}
                        </button>
                    </div>

                
             
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    Powered by AI fashion intelligence
                </p>
            </div>
        </div>
    );
}