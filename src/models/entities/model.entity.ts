import { VehicleBrand } from '@prisma/client';

export class VehicleModel {
  id: number;
  name: string;
  brandId: number;
  brand?: VehicleBrand;
}
