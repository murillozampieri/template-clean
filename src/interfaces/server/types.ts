import { Request } from 'express';
import { ILogger } from '../../util/logger';

interface CustomRequest extends Request {
  trackingId: string;
  logger: ILogger;
}

export { CustomRequest };
