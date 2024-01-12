import { OpenWeatherResolver } from '../src/resolvers/openWeatherResolver';
import { graphql } from 'graphql';
import { stitchedSchema } from '../src/utils/schemaStitching';

jest.mock('../src/resolvers/openWeatherResolver', () => ({
  OpenWeatherResolver: {
    Query: {
      getWeatherBatch: jest.fn().mockResolvedValue([
        {
          weather: [{ id: 800, main: 'Clear', description: 'clear sky' }],
          main: { temp: 20, feels_like: 20 },
          sys: { country: 'US' },
          name: 'Mock City',
          cod: 200,
        },
      ]),
    },
  },
}));

describe('OpenWeather GraphQL Query', () => {
  it('fetches weather data for cities', async () => {
    const GET_WEATHER_BATCH = `
      query {
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
          cod
        }
      }
    `;

    const response = await graphql({
      schema: stitchedSchema,
      source: GET_WEATHER_BATCH,
      contextValue: { user: { userId: 'test-user' } },
    });

    expect(response.data?.getWeatherBatch).toBeDefined();
    // @ts-ignore
    expect(response.data?.getWeatherBatch.length).toBeGreaterThan(0);
    expect(response.data?.getWeatherBatch[0].name).toEqual('Mock City');
    expect(response.errors).toBeUndefined();
  });
});
