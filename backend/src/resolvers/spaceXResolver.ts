import fetch from 'node-fetch';
import { AccessLog } from '../models/accessLog';
import { Launch, SpaceXApiResponse } from '../interfaces/spaceXInterface';

export const SpaceXResolver = {
  Query: {
    async getLast30Launches(parent, args, context): Promise<Launch[]> {
      try {
        if (!context.user) {
          throw new Error('Unauthorized');
        }

        const response = await fetch(
          'https://main--spacex-l4uc6p.apollographos.net/graphql',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `{ launchesPast(limit: 30) { mission_name mission_id details } }`,
            }),
          }
        );

        if (context.user) {
          await new AccessLog({
            query: 'getLast30Launches',
            user: context.user.userId,
          }).save();
        }

        const responseData = (await response.json()) as SpaceXApiResponse;
        return responseData.data.launchesPast;
      } catch (error) {
        console.error('Error fetching data from SpaceX API:', error);
        return [];
      }
    },
  },
};
