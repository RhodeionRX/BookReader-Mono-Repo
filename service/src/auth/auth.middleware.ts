import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }

    const token: string = req.headers.authorization
      .replace('Bearer', '')
      .trim();

    try {
      const decodedData = verify(token, process.env.SECRET);
      req.user = decodedData;
      next();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
