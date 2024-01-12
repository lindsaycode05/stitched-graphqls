import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

declare module 'express' {
  export interface Request {
    user?: { userId: string };
  }
}
