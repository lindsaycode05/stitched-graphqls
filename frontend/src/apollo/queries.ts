import { gql } from '@apollo/client';

export const FETCH_WEATHER_AND_LAUNCHES = gql`
  query getWeatherAndLaunches {
    getWeatherBatch {
      weather {
        id
        main
        description
      }
      main {
        temp
        feels_like
      }
      sys {
        country
      }
      name
    }
    getLast30Launches {
        mission_id
        mission_name
        details
    }
  }
`;
