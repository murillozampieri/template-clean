import { Response } from 'express';
import { CustomRequest } from '../types';
import { Request } from '../../../infrastructure/express/request';
import { logger } from '../../../util/logger';

export class HealthCheckController {
  check = (req: CustomRequest, res: Response): void => {
    const request = new Request(req, res, logger);

    request.handlerSuccess({
      status: 'ok'
    });
  };
}
