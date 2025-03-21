import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const apiKey = "SJFMRyCLN8ZfSAnY6NJ5";
const initialCoords = {
  lng: 37.606865,
  lat: 55.788246,
  zoom: 15,
};
export default function AboutUsPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
      center: [initialCoords.lng, initialCoords.lat],
      zoom: initialCoords.zoom,
    });

    marker.current = new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([initialCoords.lng, initialCoords.lat])
      .addTo(map.current);

    return () => {
      map.current.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="h-screen bg-light-blue flex flex-col md:flex-row p-6 mt-20">
      <div className="flex-1 pr-6 mb-6 md:mb-0">
        <h1 className="text-3xl font-bold mb-4">О нас</h1>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">График работы:</h2>
            <ul className="text-lg space-y-2">
              <li>Пн-Пт: 9:00 - 18:30</li>
              <li>Сб: 9:00 - 17:00</li>
              <li>
                Вс: <span className="text-dark-red">выходной</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">Адрес:</h2>
            <p className="text-lg">
              Новосущёвская ул., 22, стр. 1, Москва, этаж 1
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 h-96 rounded-lg overflow-hidden shadow-lg shadow-dark-gray-blue mb-6 md:mb-0">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </div>
  );
}
