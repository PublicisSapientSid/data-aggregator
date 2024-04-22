import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('HOTEL_SERVICE')
    private readonly hotelServiceClient: ClientProxy,
  ) {}

  async aggregateData(): Promise<
    Observable<{ hotelData: Record<string, any>[] }>
  > {
    return this.hotelServiceClient.send('findAllHotels', {}).pipe(
      map((response) => {
        return { hotelData: response };
      }),
    );
  }
}
