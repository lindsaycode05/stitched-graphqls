import { stitchSchemas } from '@graphql-tools/stitch';
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';
import { BaseTypeDefs } from '../schemas/baseSchema';
import { OpenWeatherTypeDefs } from '../schemas/openWeatherSchema';
import { SpaceXTypeDefs } from '../schemas/spaceXSchema';
import { OpenWeatherResolver } from '../resolvers/openWeatherResolver';
import { SpaceXResolver } from '../resolvers/spaceXResolver';
import { gql } from 'apollo-server-express';
import { AccessLogTypeDefs } from '../schemas/accessLogSchema';
import { AccessLogResolver } from '../resolvers/accessLogResolvers';
import { dateScalar } from '../types/dateScalar';

const localTypeDefs = gql`
  ${BaseTypeDefs}
  ${AccessLogTypeDefs}
`;

const combinedTypeDefs = gql`
  ${BaseTypeDefs}
  ${OpenWeatherTypeDefs}
  ${SpaceXTypeDefs}
`;

const localExecutableSchema = makeExecutableSchema({
  typeDefs: localTypeDefs,
  resolvers: {
    Date: dateScalar,
    Query: {
      ...AccessLogResolver.Query,
    },
  },
});

const stitchedExecutableSchema = makeExecutableSchema({
  typeDefs: combinedTypeDefs,
  resolvers: {
    Query: {
      ...OpenWeatherResolver.Query,
      ...SpaceXResolver.Query,
    },
  },
});

// stitch schemas
export const stitchedSchema = stitchSchemas({
  subschemas: [
    {
      schema: localExecutableSchema,
    },
    {
      schema: stitchedExecutableSchema,
    },
  ],
});
