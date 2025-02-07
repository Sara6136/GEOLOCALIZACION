"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// 📍 Coordenadas de La Maná, Ecuador
const laManaBounds = {
  north: -0.92,
  south: -1.00,
  west: -79.25,
  east: -79.10,
};

const Mapa = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const lat = Math.max(laManaBounds.south, Math.min(latitude, laManaBounds.north));
          const lng = Math.max(laManaBounds.west, Math.min(longitude, laManaBounds.east));
          setUserLocation({ lat, lng });
        },
        (error) => console.error("Error obteniendo ubicación:", error),
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="p-4 shadow-lg bg-white rounded-xl">
        <h2 className="text-xl bg-black font-bold text-center mb-4">📍 Mi Ubicación en Tiempo Real</h2>
        {userLocation ? (
          <GoogleMap 
            mapContainerStyle={containerStyle} 
            center={userLocation} 
            zoom={15} 
            options={{
              restriction: { latLngBounds: laManaBounds, strictBounds: true },
              disableDefaultUI: true,
            }}
          >
            <Marker position={userLocation} />
          </GoogleMap>
        ) : (
          <p className="text-center">Obteniendo ubicación...</p>
        )}
      </div>
    </LoadScript>
  );
};

export default Mapa;
