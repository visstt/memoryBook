import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useHeroStore from "../../../store/heroStore";
import { useParams } from "react-router-dom";

const LeftbarFilter = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { getFilter, filters, getHero } = useHeroStore();
  const [selectedValues, setSelectedValues] = useState({});
  const { id } = useParams();
  const category_id = id;

  useEffect(() => {
    getFilter();
  }, []);

  // Инициализация выбранных значений
  useEffect(() => {
    if (drawerOpen && filters) {
      const initialSelectedValues = {};
      Object.keys(filters).forEach((key) => {
        initialSelectedValues[key] = [];
      });
      setSelectedValues(initialSelectedValues);
    }
  }, [drawerOpen, filters]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Обработка изменения чекбокса
  const handleChangeCheckbox = (event, filterKey, value) => {
    const updatedSelectedValues = { ...selectedValues };
    if (event.target.checked) {
      updatedSelectedValues[filterKey] = [
        ...(updatedSelectedValues[filterKey] || []),
        value,
      ];
    } else {
      updatedSelectedValues[filterKey] = updatedSelectedValues[
        filterKey
      ].filter((v) => v !== value);
    }
    setSelectedValues(updatedSelectedValues);
  };

  // Применение фильтров
  const handleApplyFilters = async () => {
    const filterData = {
      n_raion: selectedValues["n_raion"] || [], // Предполагается, что n_raion - это ключ в selectedValues
      kontrakt: selectedValues["kontrakt"] || [], // Предполагается, что kontrakt - это ключ в selectedValues
    };

    console.log("Applied Filters:", filterData);

    // Вызов getHero с параметрами фильтров
    await getHero(filterData.n_raion.join(","), filterData.kontrakt.join(","));
  };

  // Сброс фильтров
  const handleResetFilters = async () => {
    const resetSelectedValues = {};
    Object.keys(filters).forEach((key) => {
      resetSelectedValues[key] = [];
    });
    setSelectedValues(resetSelectedValues);
    console.log("Filters Reset");
    await getHero();
    // Здесь можно вызвать функцию для сброса фильтров на сервере
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ mt: 5 }}>
        <Button
          sx={{
            background: "#1C1C1CE5",
            color: "white",
            height: "50px",
            width: "150px",
          }}
          onClick={toggleDrawer}
        >
          Фильтрация
          <FilterListIcon />
        </Button>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "100%", md: "350px" },
            height: "100vh",
          },
        }}
      >
        <Box sx={{ padding: 2, height: "100vh", position: "relative" }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
            Фильтрация
          </Typography>
          <Box sx={{ mt: 2 }}>
            {filters && Object.keys(filters).length > 0 ? (
              Object.keys(filters).map((filterKey) => (
                <Accordion
                  sx={{ mt: 2, mb: 2 }}
                  key={filterKey}
                  defaultExpanded
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{filterKey} </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {filters[filterKey].map((value) => (
                      <FormControlLabel
                        key={`${filterKey}-${value}`}
                        control={
                          <Checkbox
                            sx={{
                              color: "#E01D04",
                              "&.Mui-checked": { color: "#E01D04" },
                            }}
                            checked={selectedValues[filterKey]?.includes(value)}
                            onChange={(e) =>
                              handleChangeCheckbox(e, filterKey, value)
                            }
                          />
                        }
                        label={value}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Typography>Нет доступных фильтров</Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 2,
              gridGap: 30,
            }}
          >
            <Button
              sx={{
                background: "#000",
                color: "white",
                height: "50px",
                width: { xs: "30%", md: "150px" },
              }}
              onClick={() => {
                handleApplyFilters();
                toggleDrawer();
              }}
            >
              Применить фильтры
            </Button>
            <Button
              sx={{
                background: "#E74C3C",
                color: "white",
                height: "50px",
                width: { xs: "30%", md: "150px" },
              }}
              onClick={() => {
                handleResetFilters();
                toggleDrawer();
              }}
            >
              Сбросить фильтры
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default LeftbarFilter;
