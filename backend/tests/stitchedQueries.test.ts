import { graphql } from 'graphql';
import { stitchedSchema } from '../src/utils/schemaStitching';
import { OpenWeatherResolver } from '../src/resolvers/openWeatherResolver';
import { SpaceXResolver } from '../src/resolvers/spaceXResolver';
import { AccessLogResolver } from '../src/resolvers/accessLogResolvers';

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

jest.mock('../src/resolvers/spaceXResolver', () => ({
  SpaceXResolver: {
    Query: {
      getLast30Launches: jest.fn().mockResolvedValue(
        Array(30).fill({
          mission_name: 'Test Mission',
          mission_id: ['1'],
          details: 'Test Details',
        })
      ),
    },
  },
}));

jest.mock('../src/resolvers/accessLogResolvers', () => ({
  AccessLogResolver: {
    Query: {
      accessLogs: jest
        .fn()
        .mockResolvedValue([
          { query: 'TestQuery', accessedAt: new Date(), user: 'test-user' },
        ]),
    },
  },
}));

describe('Stitched GraphQL Queries', () => {
  it('fetches OpenWeather, SpaceX, and Access Logs data', async () => {
    const STITCHED_QUERY = `
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
        getLast30Launches {
          mission_name
          mission_id
          details
        }
        accessLogs {
          query
          accessedAt
          user
        }
      }
    `;

    const response = await graphql({
      schema: stitchedSchema,
      source: STITCHED_QUERY,
      contextValue: { user: { userId: 'test-user' } },
    });

    expect(response.data?.getWeatherBatch).toBeDefined();
    expect(response.data?.getLast30Launches).toBeDefined();
    expect(response.data?.accessLogs).toBeDefined();
    expect(response.errors).toBeUndefined();
  });
});
