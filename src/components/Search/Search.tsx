import React, { useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";

import { fetchWeather } from "../../store/fetchWeather";
import { fetchCities } from "./../../api/placeSuggestion";
import { useClickOutside } from "./../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  LocationButton,
  LocationIcon,
  SearchElement,
  SearchIcon,
  SearchInput,
  SearchResult,
  Select,
  Option,
} from "./styled";
import Suggestion from "./Suggestion";

import { HeaderIconsContainer } from "../Header/styed";
import DarkModeToggle from "react-dark-mode-toggle";
import { AppStore } from "../../store/store";
import { toggleDarkMode } from "../../store/reducers/appReducer";

const mockData = [
  {
    city: "Colombo",
    coords: {
      lat: 6.927079,
      lng: 79.861244,
    },
  },
  {
    city: "Galle",
    coords: {
      lat: 6.053519,
      lng: 80.220977,
    },
  },
  {
    city: "Kandy",
    coords: {
      lat: 7.290572,
      lng: 80.633728,
    },
  },
  {
    city: "Jaffna",
    coords: {
      lat: 9.661743,
      lng: 80.025535,
    },
  },

  {
    city: "Anuradhapura",
    coords: {
      lat: 8.3114,
      lng: 80.4037,
    },
  },
  {
    city: "Badulla",
    coords: {
      lat: 6.9894,
      lng: 81.055,
    },
  },
  {
    city: "Batticaloa",
    coords: {
      lat: 7.7172,
      lng: 81.7006,
    },
  },
  {
    city: "Gampaha",
    coords: {
      lat: 7.0917,
      lng: 80.0088,
    },
  },
  {
    city: "Hambantota",
    coords: {
      lat: 6.1241,
      lng: 81.1185,
    },
  },
  {
    city: "Kalutara",
    coords: {
      lat: 6.5854,
      lng: 79.9607,
    },
  },

  {
    city: "Kegalle",
    coords: {
      lat: 7.2514,
      lng: 80.3464,
    },
  },
  {
    city: "Kilinochchi",
    coords: {
      lat: 9.3906,
      lng: 80.4006,
    },
  },
  {
    city: "Kurunegala",
    coords: {
      lat: 7.4869,
      lng: 80.362,
    },
  },
  {
    city: "Mannar",
    coords: {
      lat: 8.9772,
      lng: 79.9096,
    },
  },
  {
    city: "Matale",
    coords: {
      lat: 7.4675,
      lng: 80.6234,
    },
  },
  {
    city: "Nuwara",
    coords: {
      lat: 6.9497,
      lng: 80.7891,
    },
  },
];

const cityNames = [
  "Colombo",
  "Galle",
  "Kandy",
  "Jaffna",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Gampaha",
  "Hambantota",
  "Kalutara",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
  "Ampara",
  "Boralesgamuwa",
  "Dehiwala-Mount Lavinia",
  "Embilipitiya",
  "Horana",
  "Kadawatha",
  "Kalmunai",
  "Katunayake",
  "Kelaniya",
  "Kuliyapitiya",
  "Maharagama",
  "Moratuwa",
  "Negombo",
  "Panadura",
  "Peliyagoda",
  "Sri Jayawardenepura Kotte",
  "Wattala",
  "Weerawila",
  "Weligama",
  "Wattala",
  "Wennappuwa",
  // Add more city names as needed
];

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const suggestionRef = useRef(null);
  const newRef = useRef(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [filter, setFilter] = useState("area");

  const isDarkMode = useSelector((state: AppStore) => state.app.darkMode);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setShowSuggestions(true);

    const newSearchTerm = searchTerm.toLowerCase().trim();

    // Filter the mockData array based on the city name
    const filteredCities = cityNames.filter((data) => {
      const city = data.toLowerCase();
      return city.includes(newSearchTerm);
    });

    setSuggestions(filteredCities.map((item) => item));
  }, [searchTerm]);

  useEffect(() => {
    const position = {
      coords: {
        latitude: 6.927079,
        longitude: 79.861244,
      },
    };

    showPosition(position);
  }, []);

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onSearchLatitude = (e: any) => {
    console.log(e.target.value);
    setLat(e.target.value);
  };

  const onSearchLongitude = (e: any) => {
    console.log(e.target.value);
    setLng(e.target.value);
  };

  const onSearchCity = (e: any) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  const searchLocation = () => {
    const position = {
      coords: {
        latitude: lat,
        longitude: lng,
      },
    };

    showPosition(position);
  };

  const showPosition = (position: any) => {
    dispatch(
      fetchWeather({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  const handleSelectChange = (event: any) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <div>
          <Select id="location" value={filter} onChange={handleSelectChange}>
            <Option value="area">Area</Option>
            <Option value="city">City</Option>
          </Select>
        </div>

        <div>
          <HeaderIconsContainer>
            <DarkModeToggle
              checked={isDarkMode}
              onChange={() => dispatch(toggleDarkMode())}
              size={60}
            />
          </HeaderIconsContainer>
        </div>
      </div>

      {filter === "area" ? (
        <SearchElement>
          <SearchIcon onClick={searchLocation} />
          <DebounceInput
            element={SearchInput}
            debounceTimeout={300}
            onChange={onSearchLatitude}
            placeholder="latitude"
          />

          <DebounceInput
            element={SearchInput}
            debounceTimeout={300}
            onChange={onSearchLongitude}
            placeholder="longitude"
          />
          <LocationButton
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
              } else {
                alert("Geolocation is not supported by this browser.");
              }
            }}
          >
            <LocationIcon />
          </LocationButton>
        </SearchElement>
      ) : (
        <SearchElement>
          <SearchIcon onClick={searchLocation} />
          <DebounceInput
            element={SearchInput}
            debounceTimeout={300}
            onChange={onSearchCity}
            placeholder="City Search"
          />

          <LocationButton
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
              } else {
                alert("Geolocation is not supported by this browser.");
              }
            }}
          >
            <LocationIcon />
          </LocationButton>
          {showSuggestions && (
            <SearchResult ref={suggestionRef}>
              {suggestions?.slice(0, 12)?.map((s, i) => (
                <Suggestion
                  key={i}
                  label={s}
                  hideSuggestionFn={() => {
                    setShowSuggestions(false);
                  }}
                />
              ))}
            </SearchResult>
          )}
        </SearchElement>
      )}
    </>
  );
};

export default Search;
