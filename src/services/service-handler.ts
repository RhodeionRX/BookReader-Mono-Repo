import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { handleMicroserviceException } from 'src/utils';

export class ServiceHandler {
  protected readonly client: ClientProxy;
  protected readonly serviceName: string;

  constructor(_client: ClientProxy) {
    this.client = _client;
  }

  public async send(action: string, payload: Record<string, unknown> | string) {
    const result = await lastValueFrom(
      this.client
        .send(action, payload)
        .pipe(catchError(handleMicroserviceException)),
    );

    return result;
  }
}
