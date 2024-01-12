import { AccessLog } from '../models/accessLog';

export const AccessLogResolver = {
  Query: {
    async accessLogs(parent, args, context) {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      return AccessLog.find({});
    },
  },
};
