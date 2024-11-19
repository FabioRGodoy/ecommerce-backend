import { CartItem, User } from '@prisma/client';

export class Cart {
  id: number;
  user: User;
  userId: number;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}
