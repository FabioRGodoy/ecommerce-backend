import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  private handleError(message: string) {
    console.error(message);
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    try {
      const cart = await this.prisma.cart.create({
        data: {
          userId: createCartDto.userId,
          items: {
            create: createCartDto.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      });

      return cart;
    } catch (error) {
      this.handleError('Erro ao criar o carrinho');
    }
  }

  async updateCartItems(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({ where: { id } });

    if (!cart) {
      throw new NotFoundException(`Carrinho não encontrado`);
    }

    if (updateCartDto.items) {
      await Promise.all(
        updateCartDto.items.map((item) =>
          this.prisma.cartItem.upsert({
            where: {
              cartId_productId: {
                cartId: id,
                productId: item.productId,
              },
            },
            update: {
              quantity: item.quantity,
            },
            create: {
              cartId: id,
              productId: item.productId,
              quantity: item.quantity,
            },
          }),
        ),
      );
    }

    return await this.prisma.cart.findUnique({ where: { id } });
  }

  async remove(id: number) {
    await this.prisma.cart.delete({
      where: { id },
    });
    return { status: HttpStatus.OK };
  }
}
