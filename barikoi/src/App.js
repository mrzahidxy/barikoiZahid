import "./App.css";
import Search from "./Search";
import Maps from "./Maps";
import { useState } from "react";

function App() {
  const [place, setPlace] = useState({});

  const getLocation = location => {
    setPlace(location);
  };

  return (
    <div className="App">
      <Search extractLocation={getLocation} />
      <Maps place={place} />
    </div>
  );
}

export default App;
