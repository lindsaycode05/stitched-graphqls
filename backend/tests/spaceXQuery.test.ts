import fetchMock from 'jest-fetch-mock';
import { graphql } from 'graphql';
import { stitchedSchema } from '../src/utils/schemaStitching';
import { AccessLog } from '../src/models/accessLog';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest
    .spyOn(AccessLog.prototype, 'save')
    .mockImplementationOnce(() => Promise.resolve({}));
});

describe('SpaceX GraphQL Query', () => {
  it('fetches last 30 SpaceX launches', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          launchesPast: Array(30).fill({
            mission_name: 'Test Mission',
            mission_id: ['1'],
            details: 'Test Details',
          }),
        },
      })
    );

    const GET_SPACEX_LAUNCHES = `
      query {
        getLast30Launches {
          mission_name
          mission_id
          details
        }
      }
    `;

    const response = await graphql({
      schema: stitchedSchema,
      source: GET_SPACEX_LAUNCHES,
      contextValue: { user: { userId: 'test-user' } },
    });

    expect(response.data?.getLast30Launches).toBeDefined();
    // @ts-ignore
    expect(response.data?.getLast30Launches.length).toBeLessThanOrEqual(30);
    expect(response.errors).toBeUndefined();
  }, 30000);
});
