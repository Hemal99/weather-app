import React, { useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../store/fetchWeather";
import { fetchCities } from "./../../api/placeSuggestion";
import { useClickOutside } from "./../../hooks/useClickOutside";
import {
  LocationButton,
  LocationIcon,
  SearchElement,
  SearchIcon,
  SearchInput,
  SearchResult,
} from "./styled";
import Suggestion from "./Suggestion";

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

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setShowSuggestions(true);

    setSuggestions(mockData.map((item) => item.city));
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
  return (
    <>
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
      <SearchElement>
        <SearchIcon onClick={searchLocation} />
        <DebounceInput
          element={SearchInput}
          debounceTimeout={300}
          onChange={onSearchCity}
          placeholder="City Search ..."
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
    </>
  );
};

export default Search;
