import React, { useEffect, useState } from "react";
import axios from "axios";

function useForecast(grad) {
  //city data
  const [data, setData] = useState({
    city: "",
    country: "",
    lat: null,
    lon: null,
  });

  //city forecast
  const [forecast, setForecast] = useState({
    temp: null,
    description: null,
    low: null,
    high: null,
    wind: null,
    feelsLike: null,
    sunrise: null,
    sunset: null,
    img: null,
  });

  //next days
  const [nextDays, setNextDays] = useState([]);
  const [error, setError] = useState(false);
  const [loadingOne, setLoadingOne] = useState(true);
  const [loadingTwo, setLoadingTwo] = useState(true);
  const [loadingThree, setLoadingThree] = useState(true);

  //get city lon and lan
  useEffect(() => {
    async function getDataFromCity() {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${grad}&appid=74a44ce088cdb81b7c1af5f737ba573e`
        );
        setData({
          city: response.data[0].name,
          country: response.data[0].country,
          lat: response.data[0].lat,
          lon: response.data[0].lon,
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoadingOne(false);
      }
    }
    getDataFromCity();
  }, [grad]);

  //get current weather
  useEffect(() => {
    async function getForecastFromCity() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=74a44ce088cdb81b7c1af5f737ba573e&units=metric`
        );
        setForecast({
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          low: response.data.main.temp_min,
          high: response.data.main.temp_max,
          wind: response.data.wind.speed,
          feelsLike: response.data.main.feels_like,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          img: response.data.weather[0].icon,
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoadingTwo(false);
      }
    }
    getForecastFromCity();
  }, [data]);

  //get next days weather
  useEffect(() => {
    async function getNextDaysFromCity() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&appid=74a44ce088cdb81b7c1af5f737ba573e&exclude=minutely,hourly,alerts&units=metric`
        );
        setNextDays(response.data.daily);
      } catch (error) {
        setError(true);
      } finally {
        setLoadingThree(false);
      }
    }
    getNextDaysFromCity();
  }, [data]);

  return {
    forecast,
    data,
    nextDays,
    loadingOne,
    loadingTwo,
    loadingThree,
    error,
  };
}

export default useForecast;
