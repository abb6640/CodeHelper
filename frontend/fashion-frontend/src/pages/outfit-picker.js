import React, { useState } from "react";

export  function OutfitPickerPage () {
    const [value, setValue] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted with value:", value);
        let res = await fetch(process.env.REACT_APP_API_BASE_URL+"/scrape", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ keyword: value })
        })
        let data = await res.json();
        console.log("Response data:", data);
    }
    function handleChange(e) {
        setValue(e.target.value);

    }


    return (
        <>
            <h1>Enter Your Outfit Preferences</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} 
                    value={value}
                type="text" placeholder="Enter your text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required />
            </form>
</>
    );
}