// import React from "react";

// export default function Map() {
//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <iframe
//         src="https://geois2.orb.ru/resource/8909/display?panel=layers"
//         width="100%"
//         height="100%"
//         style={{ border: "none" }}
//         title="NextGIS Web Map"
//       />
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4"; // Импортируем proj4 для преобразования координат

export default function Map() {
  const mapContainer = useRef(null);
  const [data, setData] = useState([]);
  const mapRef = useRef(null); // Ссылка на объект карты

  // Определяем проекции для преобразования координат
  proj4.defs(
    "EPSG:3857",
    "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"
  );
  proj4.defs("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");

  useEffect(() => {
    // Инициализация карты только один раз
    if (!mapRef.current) {
      // Фиксированный центр карты: Тюльганский район, Оренбургская область
      const map = L.map(mapContainer.current).setView([52.5, 56.0], 10); // Центр и zoom
      mapRef.current = map; // Сохраняем объект карты в ref

      // Добавление базового слоя (например, OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    }

    // Загрузка данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geois2.orb.ru/api/resource/8860/feature/",
          {
            headers: {
              Accept: "*/*",
              Authorization: "Basic " + btoa("hackathon_36:hackathon_36_25"), // Basic Auth
            },
          }
        );
        const result = await response.json();
        console.log("Данные загружены:", result); // Отладка: проверка данных
        setData(result); // Сохраняем данные в состоянии
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();

    return () => {
      // Очистка карты при размонтировании
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Добавление маркеров на карту после загрузки данных
  useEffect(() => {
    if (data.length > 0 && mapRef.current) {
      const map = mapRef.current;

      // Очистка предыдущих маркеров (если есть)
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      data.forEach((feature) => {
        // Парсинг координат из WKT-формата (POINT)
        const wkt = feature.geom;
        const regex = /POINT\(([^ ]+) ([^ ]+)\)/;
        const match = wkt.match(regex);
        if (match) {
          const x = parseFloat(match[1]); // Координата X (в проекции Меркатора)
          const y = parseFloat(match[2]); // Координата Y (в проекции Меркатора)

          // Преобразование координат из EPSG:3857 в EPSG:4326 (широта и долгота)
          const [lng, lat] = proj4("EPSG:3857", "EPSG:4326", [x, y]);

          console.log("Добавление маркера:", { lat, lng }); // Отладка: проверка координат

          // Создание маркера
          const marker = L.marker([lat, lng]).addTo(map);

          // Создание popup с информацией
          const popupContent = `
            <b>${feature.fields.fio}</b><br>
            <b>Район:</b> ${feature.fields.n_raion}<br>
            <b>Годы:</b> ${feature.fields.years}<br>
            <b>Информация:</b> ${feature.fields.info}<br>
            <b>Контракт:</b> ${feature.fields.kontrakt}<br>
            <b>Награды:</b> ${feature.fields.nagrads}<br>
          `;

          // Добавление popup к маркеру
          marker.bindPopup(popupContent);
        } else {
          console.error("Не удалось распарсить координаты:", wkt); // Отладка: ошибка парсинга
        }
      });
    }
  }, [data]);

  return (
    <div ref={mapContainer} style={{ width: "100%", height: "100vh" }}></div>
  );
}
