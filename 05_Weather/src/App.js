import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const apiKey = "f1aa67047bb67fe3d6183de66066a9d4";
  const [inputCity,setInputCity]=useState("")

  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
        console.log("response", res.data);
        setData(res.data)
      }).catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput=(e)=>{
       setInputCity(e.target.value)
  }
  const handleSearch=()=>{
    getWeatherDetails(inputCity)
  }

  useEffect(() => {
    getWeatherDetails("delhi");
  }, []);

  return (
    <div className="col-md-12 c" >
      <div className="weatherBg">
        <h1 className="heading">Weather App! </h1>
        <div className="d-grid gap-3 col-4 mt-4 ">
          <input type="text" className="form-control"
          value={inputCity}
          onChange={handleChangeInput}/>
          <button className="btn btn-primary" type="button" 
          onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img
            className="weatherIcon"
            src="https://tse1.mm.bing.net/th/id/OIP.dwuAXVyZx5MTZsLoTojyUQHaHa?w=188&h=188&c=7&r=0&o=5&pid=1.7"
          ></img>
          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp">{((data?.main?.temp)-273.15).toFixed(2)}</h6>
        </div>
      </div>
    </div>
  );
}

export default App;
