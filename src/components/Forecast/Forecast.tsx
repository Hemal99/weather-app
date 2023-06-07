import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../store/store";
import ForecastItem from "./ForecastItem";
import {
  ForecastContainer,
  ForecastItems,
  SectionTitle,
  ForecastItemsInitial,
} from "./styled";

const Forecast: React.FC = () => {
  const { forecast, isInitial } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
    isInitial: state.app.isInitial,
    forecast: state.weather.extendedWeatherData,
  }));

  const [viewMore, setViewMore] = React.useState(false);
  const [forecastItems, setForecastItems] = React.useState(3);

  const handleViewMore = () => {
    if (viewMore) {
      setForecastItems(3);
    } else {
      setForecastItems(7);
    }
    setViewMore((prev) => !prev);
  };

  if (isInitial) return <></>;

  return (
    <ForecastContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SectionTitle>Extended Forecast</SectionTitle>
        <div>
          <button
            style={{
              backgroundColor: "transparent",
              border: "1px solid #4a6fa1",
              padding: "0.3rem 0.8rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              color: "#4a6fa1",

              fontSize: "1rem",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={handleViewMore}
          >
            {viewMore ? "View Less" : "View More"}
          </button>
        </div>
      </div>
      {viewMore ? (
        <ForecastItems>
          {forecast.length > 0 &&
            forecast
              ?.map?.((item, i) => {
                return (
                  <ForecastItem
                    key={i}
                    day={item.day}
                    high={item.temp.temp_max}
                    low={item.temp.temp_min}
                    weatherCode={item.weather.id}
                    main={item.weather.main}
                  />
                );
              })
              .slice(0, forecastItems)}
        </ForecastItems>
      ) : (
        <ForecastItemsInitial>
          {forecast.length > 0 &&
            forecast
              ?.map?.((item, i) => {
                return (
                  <ForecastItem
                    key={i}
                    day={item.day}
                    high={item.temp.temp_max}
                    low={item.temp.temp_min}
                    weatherCode={item.weather.id}
                    main={item.weather.main}
                  />
                );
              })
              .slice(0, forecastItems)}
        </ForecastItemsInitial>
      )}
    </ForecastContainer>
  );
};

export default Forecast;
