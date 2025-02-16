import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4"; // Импортируем proj4 для преобразования координат
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Иконка для закрытия сайдбара

export default function Map() {
  const mapContainer = useRef(null);
  const [data, setData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null); // Состояние для выбранного маркера
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Состояние для открытия/закрытия сайдбара
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

          // Обработчик клика на маркер
          marker.on("click", () => {
            setSelectedFeature(feature); // Обновляем состояние выбранного маркера
            setIsSidebarOpen(true); // Открываем сайдбар
          });
        } else {
          console.error("Не удалось распарсить координаты:", wkt); // Отладка: ошибка парсинга
        }
      });
    }
  }, [data]);

  // Закрытие сайдбара
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedFeature(null);
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      {/* Сайдбар для отображения информации */}
      <div
        style={{
          width: isSidebarOpen ? "300px" : "0", // Ширина сайдбара
          height: "100vh",
          overflowY: "auto",
          padding: isSidebarOpen ? "10px" : "0", // Отступы только при открытом сайдбаре
          backgroundColor: "#f0f0f0",
          borderRight: "1px solid #ccc",
          transition: "width 0.3s, padding 0.3s", // Анимация открытия/закрытия
          position: "relative", // Для позиционирования кнопки закрытия
        }}
      >
        {isSidebarOpen && (
          <>
            {/* Кнопка закрытия сайдбара (видна только на мобильных устройствах) */}
            <IconButton
              onClick={closeSidebar}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: { xs: "block", sm: "none" }, // Видна только на мобильных
              }}
            >
              <CloseIcon />
            </IconButton>

            {selectedFeature ? (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <b>ФИО:</b>
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {selectedFeature.fields.fio}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <b>Район:</b>
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {selectedFeature.fields.n_raion}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <b>Годы:</b>
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {selectedFeature.fields.years}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <b>Информация:</b>
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {selectedFeature.fields.info}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <b>Контракт:</b>
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {selectedFeature.fields.kontrakt}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      <b>Награды:</b>
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {selectedFeature.fields.nagrads}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Выберите маркер на карте, чтобы увидеть информацию.</p>
            )}
          </>
        )}
      </div>

      {/* Контейнер для карты */}
      <div
        ref={mapContainer}
        style={{
          flex: 1,
          height: "100vh",
          width: "100%",
          transition: "margin 0.3s",
          marginLeft: isSidebarOpen ? "0" : "0", // Сдвиг карты при открытии сайдбара
        }}
      ></div>
    </div>
  );
}
