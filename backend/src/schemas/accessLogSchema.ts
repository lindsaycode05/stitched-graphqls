import { gql } from 'apollo-server-express';

export const AccessLogTypeDefs = gql`
  scalar Date

  type AccessLog {
    query: String
    accessedAt: Date
    user: String
  }

  extend type Query {
    accessLogs: [AccessLog]
  }
`;
