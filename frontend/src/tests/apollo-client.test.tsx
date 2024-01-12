import { ApolloClient } from '@apollo/client';
import client from '../apollo/client';

describe('Apollo Client', () => {
  it('should create an Apollo Client instance', () => {
    expect(client).toBeInstanceOf(ApolloClient);
  });
});
