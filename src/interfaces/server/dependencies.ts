import { ILogger, logger } from "../../util/logger";

export class Dependencies {
  private static _logger: ILogger;

  static getLogger(): ILogger {
    if (!Dependencies._logger) {
      Dependencies._logger = logger;
    }
    return Dependencies._logger;
  }

}
