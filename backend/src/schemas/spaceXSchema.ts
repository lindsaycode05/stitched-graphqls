import { gql } from 'apollo-server-express';

export const SpaceXTypeDefs = gql`
  type Launch {
    mission_name: String
    details: String
    mission_id: [String]
  }

  extend type Query {
    getLast30Launches: [Launch]
  }
`;
