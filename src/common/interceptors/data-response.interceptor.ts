import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, map } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const processingStart = Date.now();
    return next.handle().pipe(
      map((data) => ({
        data,
        processingTime: Date.now() - processingStart,
        apiVersion: '1.0.0',
      })),
    );
  }
}
