import { Injectable, NestMiddleware } from '@nestjs/common';

import { LoggerService } from './logger.service';

const getString = (json) => JSON.stringify(json);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  _protocol = 'HTTP';
  constructor(private logger: LoggerService) {}
  use(request, response, next) {
    response.on('finish', () => {
      const { method, originalUrl, body, query } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} query: ${getString(
        query,
      )}; body: ${getString(body)} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message, this._protocol);
      }

      return this.logger.log(message, this._protocol);
    });

    next();
  }
}
