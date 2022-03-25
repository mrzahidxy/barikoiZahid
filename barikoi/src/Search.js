import Paper from "@mui/material/Paper";
import { useState } from "react";

const Search = ({ extractLocation }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [iconToggle, setIconToggle] = useState(true);
  const [select, setSelect] = useState({});
  const [placeId, setPlaceId] = useState(null);

  const handleChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
    setIconToggle(false);

    fetch(
      `https://barikoi.xyz/v1/api/search/autocomplete/MzExMTpWOVBHSThOTlpR/place?q=${e.target.value}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setSearchResults(data.places);
        } else {
          setSearchResults([]);
        }
      });
  };

  const handleClose = () => {
    setQuery("");
    setIconToggle(true);
    setSearchResults([]);
    setPlaceId(null);
  };

  const handleSelect = value => {
    setSelect(value);
    setQuery(value.address);
    setSearchResults([]);
    setPlaceId(value.id);

    extractLocation(value);
  };

  return (
    <div className="search">
      <h2>
        Bari<span className="title">Koi</span>
      </h2>

      <Paper className="paper" elevation={3}>
        <div className="search-box">
          <input
            type="text"
            value={query}
            className="searchbar"
            placeholder="Search Location."
            onChange={handleChange}
          />
        </div>

        <div className="icon-box">
          {iconToggle && (
            <div className="search-icon">
              <i className="fas fa-search"></i>
            </div>
          )}
          {!iconToggle && (
            <div className="close-icon">
              <i className="fas fa-times" onClick={handleClose}></i>
            </div>
          )}
        </div>
      </Paper>

      <Paper
        style={{ maxHeight: 400, overflow: "auto" }}
        className="results"
        elevation={3}
      >
        {searchResults && (
          <ul>
            {searchResults.map(place => (
              <li key={place.id} onClick={() => handleSelect(place)}>
                <div className="loc-pin">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="address">
                  <h3>{place.address}</h3>
                  <p>
                    {place.area}, {place.city}
                  </p>
                  <button>{place.pType}</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Paper>

      {placeId && (
        <Paper elevation={0} className="details">
          <h3>{select.address}</h3>
          <h4>
            {select.address}, {select.area}, {select.city}
          </h4>
          <p>Postcode: {select.postCode}</p>
          <p>{select.pType}</p>
          <p>Place Code: {select.uCode}</p>

          <div className="explore">
            <h5>Explore Nearby</h5>
            <button>Food</button>
            <button>Bank</button>
            <button>HealthCare</button>
            <button>More..</button>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Search;
