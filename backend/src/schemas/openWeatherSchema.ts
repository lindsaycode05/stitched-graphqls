import { gql } from 'apollo-server-express';

export const OpenWeatherTypeDefs = gql`
  type Weather {
    coord: Coord
    weather: [WeatherCondition]
    base: String
    main: Main
    visibility: Int
    wind: Wind
    clouds: Clouds
    dt: Int
    sys: Sys
    timezone: Int
    id: Int
    name: String
    cod: Int
  }

  type Coord {
    lon: Float
    lat: Float
  }

  type WeatherCondition {
    id: Int
    main: String
    description: String
    icon: String
  }

  type Main {
    temp: Float
    feels_like: Float
    temp_min: Float
    temp_max: Float
    pressure: Int
    humidity: Int
    sea_level: Int
    grnd_level: Int
  }

  type Wind {
    speed: Float
    deg: Int
    gust: Float
  }

  type Clouds {
    all: Int
  }

  type Sys {
    country: String
    sunrise: Int
    sunset: Int
  }

  extend type Query {
    getWeatherBatch: [Weather]
  }
`;
