import { GraphQLScalarType } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: Date) {
    // Convert Date to string
    return value.toISOString();
  },
  parseValue(value: string) {
    // Convert string to Date
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === 'StringValue') {
      return new Date(ast.value);
    }
    return null;
  },
});
