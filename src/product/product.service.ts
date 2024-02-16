import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          ...createProductDto,
        },
      });
      return newProduct;
    } catch (error) {
      throw new Error('Erro ao criar o produto');
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw new Error('Erro ao buscar produtos');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.product.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Erro ao buscar produto');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updateProduct = await this.prisma.product.update({
        where: { id: id },
        data: updateProductDto,
      });

      return updateProduct;
    } catch (error) {
      throw new Error('Erro ao editar produto');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Erro ao deletar produto');
    }
  }
}
