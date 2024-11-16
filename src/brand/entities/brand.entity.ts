import { VehicleModel } from '@prisma/client';

export class VehicleBrand {
  id: number;
  name: string;
  models?: VehicleModel[];
}
