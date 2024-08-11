import { Request, Response, NextFunction } from 'express';
import { uuid } from 'uuidv4';

const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const generatedUUID = uuid();
  req.trackingId = generatedUUID;
  res.set('Request-Id', generatedUUID);
  next();
};

export default requestId;
