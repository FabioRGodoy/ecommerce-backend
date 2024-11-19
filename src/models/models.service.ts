import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandService } from 'src/brand/brand.service';

@Injectable()
export class ModelsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly brands: BrandService,
  ) {}

  async create(createModelDto: CreateModelDto) {
    try {
      const brand = await this.brands.findOne(+createModelDto.brandId);

      if (!brand)
        throw new HttpException('Erro ao buscar modelos', HttpStatus.NOT_FOUND);

      const newModel = await this.prisma.vehicleModel.create({
        data: {
          name: createModelDto.name,
          brand: {
            connect: {
              id: createModelDto.brandId,
            },
          },
        },
      });

      return newModel;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao criar o modelo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.vehicleModel.findMany({
        include: {
          brand: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar modelos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const model = await this.prisma.vehicleModel.findUnique({
        where: { id },
        include: {
          brand: true,
        },
      });

      if (!model) {
        throw new HttpException('Modelo não encontrado', HttpStatus.NOT_FOUND);
      }

      return model;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar o modelo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    try {
      const updatedModel = await this.prisma.vehicleModel.update({
        where: { id },
        data: updateModelDto,
      });

      return updatedModel;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar o modelo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.vehicleModel.delete({
        where: { id },
      });

      return { status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        'Erro ao deletar o modelo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
