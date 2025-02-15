import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [layerData, setLayerData] = useState(null);

  // Авторизация (если API требует токен или Basic Auth)
  const login = "hackathon_36";
  const password = "hackathon_36_25";

  useEffect(() => {
    // Инициализация карты
    const map = L.map(mapContainerRef.current, {
      center: [52.3898, 56.0525], // Начальная точка карты
      zoom: 10, // Начальный уровень зума
    });

    // Добавляем слой карты (например, OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    // Функция для получения данных с API NextGIS
    const fetchLayerData = async () => {
      try {
        // Используем API NextGIS для получения данных
        const response = await fetch(
          "https://geoapi.nextgis.com/resource/8860",
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${btoa(login + ":" + password)}`, // Если используется Basic Auth
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }

        const data = await response.json();
        setLayerData(data);

        // Добавление маркеров на карту (если есть данные с координатами)
        if (data && data.features) {
          data.features.forEach((feature) => {
            if (feature.geometry && feature.geometry.coordinates) {
              const [lon, lat] = feature.geometry.coordinates;
              L.marker([lat, lon]).addTo(map);
            }
          });
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных с API:", error);
      }
    };

    fetchLayerData();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: "600px", width: "100%" }} />
    </div>
  );
};

export default Map;
