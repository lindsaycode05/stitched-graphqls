import fetch from 'node-fetch';
import { AccessLog } from '../models/accessLog';
import { config } from 'dotenv';
import {
  GeoCodingApiResponse,
  WeatherResponse,
} from '../interfaces/openWeatherInterface';
import ninetyCities from '../utils/countries';
config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Function to fetch latitude and longitude for a city
async function fetchCoordinates(
  city: string
): Promise<GeoCodingApiResponse | null> {
  const geoResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${OPENWEATHER_API_KEY}`
  );
  const geoData = (await geoResponse.json()) as GeoCodingApiResponse[];

  if (geoData && geoData.length > 0) {
    return geoData[0];
  }
  return null;
}

export const OpenWeatherResolver = {
  Query: {
    async getWeatherBatch(parent, args, context): Promise<WeatherResponse[]> {
      try {
        if (!context.user) {
          throw new Error('Unauthorized');
        }

        // Randomly select 30 cities
        const selectedCities = ninetyCities
          .sort(() => 0.5 - Math.random())
          .slice(0, 30);

        // Fetch coordinates in parallel
        const coordinatesPromises = selectedCities.map(fetchCoordinates);
        const coordinates = await Promise.all(coordinatesPromises);

        // Filter out null results and fetch weather data in parallel
        const weatherPromises = coordinates
          .filter((coord) => coord !== null)
          .map((coord) =>
            fetch(
              `http://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
            ).then((res) => res.json())
          );

        // save access log entry
        if (context.user) {
          await new AccessLog({
            query: 'getWeatherBatch',
            user: context.user.userId,
          }).save();
        }

        return Promise.all(weatherPromises);
      } catch (error) {
        console.error('Error fetching data from OpenWeather API:', error);
        return [];
      }
    },
  },
};
