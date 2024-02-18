import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.prisma.category.create({
        data: { ...createCategoryDto },
      });

      return newCategory;
    } catch (error) {
      throw new Error('Erro ao criar o categoria');
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new Error('Erro ao buscar categorias');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.category.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Erro ao buscar categoria');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.prisma.category.update({
        where: {
          id,
        },
        data: {
          ...updateCategoryDto,
        },
      });

      return updatedCategory;
    } catch (error) {
      throw new Error('Erro ao editar categoria');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      throw new Error('Erro ao deletar categoria');
    }
  }
}
