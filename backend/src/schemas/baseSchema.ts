import { gql } from 'apollo-server-express';

// Dummy Query and so that other schemas can extend it
export const BaseTypeDefs = gql`
  type Query {
    _empty: String
  }
`;
