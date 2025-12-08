import { useState } from "react";

// LocationButton component allows user to fetch nearby places based on their geolocation
function LocationButton({ onResults }) {
  
  // State to track whether location fetching is in progress
  const [loading, setLoading] = useState(false);

  // Triggered when the button is clicked
  const handleGetLocation = () => {

    // Prevent multiple clicks while already loading
    if (loading) return;

    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
      console.error("Geolocation not supported.");
      return;
    }

    // Set loading state to true while fetching location
    setLoading(true);

    // Use browser's geolocation API to get current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Extract latitude and longitude from geolocation result
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          // Call backend API to get nearby places
          const res = await fetch("https://sit-down-backend.vercel.app/places/nearby", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lat: latitude,
              long: longitude,
              radius: 3220, // search radius in meters (~2 miles)
            }),
          });

          // Check if response is OK
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${await res.text()}`);
          }

          // Parse JSON response
          const data = await res.json();
          console.log("Nearby places:", data);
          
          // Optional callback to pass data back to parent component
          if (onResults) onResults(data);
        } catch (err) {
          console.error("Location fetch failed:", err.message);
        } finally {
          // Reset loading state regardless of success or failure
          setLoading(false);
        }
      },

      // Error callback if geolocation fails
      (error) => {
        console.error("Geolocation error:", error);
        setLoading(false);
      }
    );
  };

  // Render a button that shows loading text while fetching location
  return (
    <button onClick={handleGetLocation} disabled={loading}>
      {loading ? "Finding nearby restaurants..." : "Use My Location"}
    </button>
  );
}

export default LocationButton;