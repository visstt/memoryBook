import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Map() {
  const mapContainer = useRef(null);
  const [data, setData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mapRef = useRef(null);

  // Определяем проекции для преобразования координат
  proj4.defs(
    "EPSG:3857",
    "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"
  );
  proj4.defs("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map(mapContainer.current).setView([52.5, 56.0], 10);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Добавляем границы Тюльганского района
      const tulganDistrictBoundary = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [56.2013518, 52.1402014],
                  [56.2027409, 52.1474431],
                ],
              ],
            },
          },
        ],
      };

      L.geoJSON(tulganDistrictBoundary, {
        style: {
          color: "red", // Цвет линии
          weight: 2, // Толщина линии
          opacity: 1,
          fillOpacity: 0, // Прозрачность заливки
          dashArray: "5, 5", // Пунктирная линия
          fillColor: "#00bfff", // Цвет заливки (фон) полигона
          fillOpacity: 0.3, // Прозрачность заливки
        },
      }).addTo(map);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geois2.orb.ru/api/resource/8860/feature/",
          {
            headers: {
              Accept: "*/*",
              Authorization: "Basic " + btoa("hackathon_36:hackathon_36_25"),
            },
          }
        );
        const result = await response.json();
        console.log("Данные загружены:", result);
        setData(result);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (data.length > 0 && mapRef.current) {
      const map = mapRef.current;

      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      data.forEach((feature) => {
        const wkt = feature.geom;
        const regex = /POINT\(([^ ]+) ([^ ]+)\)/;
        const match = wkt.match(regex);
        if (match) {
          const x = parseFloat(match[1]);
          const y = parseFloat(match[2]);
          const [lng, lat] = proj4("EPSG:3857", "EPSG:4326", [x, y]);

          console.log("Добавление маркера:", { lat, lng });

          const marker = L.marker([lat, lng]).addTo(map);

          marker.on("click", () => {
            setSelectedFeature(feature);
            setIsSidebarOpen(true);
          });
        } else {
          console.error("Не удалось распарсить координаты:", wkt);
        }
      });
    }
  }, [data]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedFeature(null);
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div
        style={{
          width: isSidebarOpen ? "300px" : "0",
          height: "100vh",
          overflowY: "auto",
          padding: isSidebarOpen ? "10px" : "0",
          backgroundColor: "#f0f0f0",
          borderRight: "1px solid #ccc",
          transition: "width 0.3s, padding 0.3s",
          position: "relative",
        }}
      >
        {isSidebarOpen && (
          <>
            <IconButton
              onClick={closeSidebar}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: { xs: "block", sm: "none" },
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

      <div
        ref={mapContainer}
        style={{
          flex: 1,
          height: "100vh",
          width: "100%",
          transition: "margin 0.3s",
          marginLeft: isSidebarOpen ? "0" : "0",
        }}
      ></div>
    </div>
  );
}
