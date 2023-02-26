import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { map } from 'rxjs/operators';

const getString = (json) => JSON.stringify(json);

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const logger = new LoggerService();
    const { body, url, query } = context.switchToHttp().getRequest();

    const message = `url: ${url},\n body: ${getString(
      body,
    )},\n query: ${getString(query)}\n`;

    await logger.log(message);

    return next.handle().pipe(
      map(async (data) => {
        const res = context.switchToHttp().getResponse();

        const message = `body: ${getString(data)},\n statusCode: ${
          res.statusCode
        }`;

        await logger.log(message);
        return data;
      }),
    );
  }
}
