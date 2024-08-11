import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../util/logger';

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.logger = logger.withCorrelationId(req.trackingId);
  next();
};

export default loggerMiddleware;
