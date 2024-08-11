import express from 'express';
import { Dependencies } from './dependencies';
import { requestId, loggerMiddleware } from './middleware';
import { CustomRequest } from './types';
import { HealthCheckController } from './controllers';
import { ILogger } from '../../util/logger';

declare global {
  namespace Express {
    interface Request {
      trackingId: string;
      logger: ILogger;
    }
  }
}

const logger = Dependencies.getLogger();

const app = express();
const port = 3000;

app.disable('x-powered-by');

app.use(requestId);
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) =>
  new HealthCheckController().check(req as CustomRequest, res)
);

// Iniciar o servidor
app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
});
