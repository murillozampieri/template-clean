import pino from "pino"

interface ILogger {
  setCorrectionId: (correlationId: string) => ILogger
  trace: (message: string, data?: object) => void
  debug: (message: string, data?: object) => void
  info: (message: string, data?: object) => void
  warn: (message: string, data?: object) => void
  error: (message: string, data?: object) => void
  report: (message: string, data?: object) => void
  handleException: (error: Error) => void
}

class Logger implements ILogger {
  private readonly level: string
  private correlationId: string
  private logger: pino.Logger

  constructor ({
    level = '',
    correlationId = ''
  }: {
    level: string
    correlationId?: string
  }) {
    this.level = level
    this.correlationId = correlationId
    this.logger = pino({
      level: level
    })
  }

  setCorrectionId (correlationId: string): Logger {
    this.correlationId = correlationId
    return this
  }

  formatData (data: object): string {
    return JSON.stringify({
      correlationId: this.correlationId,
      timestamp: new Date().toISOString(),
      ...data
    })
  }

  debug (message: string, data: object = {}): void {
    this.logger.debug(message, this.formatData({ message, ...data }))
  }

  info (message: string, data: object = {}): void {
    this.logger.info(message, this.formatData({ message, ...data }))
  }

  warn (message: string, data: object = {}): void {
    this.logger.warn(message, this.formatData({ message, ...data }))
  }

  error (message: string, data: object = {}): void {
    this.logger.error(message, this.formatData({ message, ...data }))
  }

  trace (message: string, data: object = {}): void {
    this.logger.trace(message, this.formatData({ message, ...data }))
  }

  report (message: string, data: object = {}): void {
    console.log(this.formatData({ message, ...data }))
  }

  handleException (error: Error): void {
    this.logger.error(error.message, { stack: error.stack })
  }

  withCorrelationId (correlationId: string): Logger {
    this.correlationId = correlationId
    return this
  }
}

const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info'
const logger = new Logger({ level: LOG_LEVEL })

export type { ILogger }
export { logger }