import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHealth(@Res() res: Response): Promise<Response> {
    const message: string = 'Server is healthy';
    const status: number = 200;
    return res.status(status).json({ message });
  }

  @Get('/hotels')
  async aggregateData(): Promise<
    Observable<{ hotelData: Record<string, any>[] }>
  > {
    return this.appService.aggregateData();
  }
}
