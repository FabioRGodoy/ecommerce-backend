import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const categoriesToConnect = createProductDto.categories.map((item) => ({
        category: {
          connect: {
            id: item.id,
          },
        },
      }));

      delete createProductDto.categories;

      const newProduct = await this.prisma.product.create({
        data: {
          ...createProductDto,
          categories: {
            create: categoriesToConnect,
          },
        },
        include: {
          categories: true,
        },
      });

      return newProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Já existe um produto com este nome.');
        }
      }
      throw new Error('Erro ao criar o produto.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw new Error('Erro ao buscar produtos');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Erro ao buscar produto');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const updateProduct = await this.prisma.product.update({
        where: { id: id },
        data: updateProductDto,
      });

      return updateProduct;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar o produto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Erro ao deletar produto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
