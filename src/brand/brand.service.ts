import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const newBrand = await this.prisma.vehicleBrand.create({
        data: {
          name: createBrandDto.name,
        },
      });
      return newBrand;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar a marca',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.vehicleBrand.findMany();
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar marcas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const brand = await this.prisma.vehicleBrand.findUnique({
        where: { id },
      });

      if (!brand) {
        throw new HttpException('Marca não encontrada', HttpStatus.NOT_FOUND);
      }

      return brand;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar a marca',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      const updatedBrand = await this.prisma.vehicleBrand.update({
        where: { id },
        data: updateBrandDto,
      });

      return updatedBrand;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar a marca',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.vehicleBrand.delete({
        where: { id },
      });

      return { status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        'Erro ao deletar a marca',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
