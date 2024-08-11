import Joi, { ValidationError } from 'joi';
import { ILogger } from '../../util/logger';
import { CustomRequest } from '../../interfaces/server/types';
import { Response } from 'express';

export class Request {
  private correlationId: string;
  private logger: ILogger;
  private requestBody: any;
  private headers: any;

  constructor(request: CustomRequest, private response: Response, logger: ILogger) {
    this.requestBody = request.body;
    this.headers = request.headers;
    this.correlationId = request.trackingId;
    logger.setCorrectionId(this.correlationId);
    this.logger = logger;
  }

  getLogger(): ILogger {
    return this.logger;
  }

  handlerResponseWithHeaders(
    body: string,
    headers: Record<string, string | string[]>,
    isBase64Encoded: boolean
  ): any {
    this.logger.report('success', {
      response: 200,
      headers,
      body,
      isBase64Encoded
    });

    return {
      statusCode: 200,
      headers,
      body,
      isBase64Encoded
    };
  }

  private handlerResponse(
    category: string,
    body: object | null,
    statusCode: number,
  ): void {
    const categories = ['error', 'success', 'error-validation'];
    if (!categories.includes(category)) {
      throw new Error('Category must be error, success or error-validation.');
    }

    if (category === 'error-validation') {
      body = this.formatMessageValidation(body as ValidationError);
    }

    if (category === 'error') {
      this.logger.report(category, {
        response: statusCode,
        body: body,
        request: this.requestBody
      });
    }

    if (category === 'success') {
      this.logger.report(category, {
        response: statusCode
      });
    }

    const responseBody =
      body !== null
        ? body
        : statusCode >= 500
          ? {message: 'Internal server error'}
          : null;

    this.response.status(200).json(responseBody);
  }

  //metodo handler success parametro body obrigatorio e status code optional
  handlerSuccess(body: object, statusCode?: number) {
    this.handlerResponse('success', body, statusCode || 200);
  }
  
  handlerException(error: Error) {
    this.handlerResponse(
      'error',
      {
        status: 'error',
        error: [error.message]
      },
      500
    );
  }

  private responseBadRequest(error: Error) {
    this.handlerResponse(
      'error',
      {
        status: 'error',
        error: [error.message]
      },
      400
    );
  }

  private responseConflict(error: Error) {
    this.handlerResponse(
      'error',
      {
        status: 'error',
        error: [error.message]
      },
      409
    );
  }

  formatMessageValidation(error: ValidationError): {
    status: string;
    errors: string[];
  } {
    const errors = error.details.map((err: Joi.ValidationErrorItem) => {
      const message = err.message.replace(/"/g, "'").replace(/\\/g, '');
      return message;
    });
    return { status: 'error', errors };
  }
}