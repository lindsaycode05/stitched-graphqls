interface GeoCodingApiResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
}

interface Sys {
  country: string;
}

interface WeatherResponse {
  weather: WeatherCondition[];
  main: MainWeather;
  sys: Sys;
  name: string;
  cod: number;
}

export {
  WeatherResponse,
  Sys,
  MainWeather,
  WeatherCondition,
  GeoCodingApiResponse,
};
