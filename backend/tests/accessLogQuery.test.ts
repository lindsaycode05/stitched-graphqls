import { AccessLogResolver } from '../src/resolvers/accessLogResolvers';
import { AccessLog } from '../src/models/accessLog';

jest.mock('../src/models/accessLog', () => ({
  AccessLog: {
    find: jest
      .fn()
      .mockResolvedValue([
        { query: 'TestQuery', accessedAt: new Date(), user: 'test-user' },
      ]),
  },
}));

describe('AccessLog GraphQL Query', () => {
  it('fetches access logs', async () => {
    const mockContext = { user: { userId: 'test-user' } };

    const result = await AccessLogResolver.Query.accessLogs(
      null,
      {},
      mockContext
    );

    // Assertions
    expect(AccessLog.find).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].query).toEqual('TestQuery');
  });
});
