import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      const createdUser = await this.prisma.user.create({
        data,
      });

      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      throw new Error('Erro ao criar o usuário');
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.user.findUnique({
        where: { id },
      });

      const user = {
        ...data,
        password: undefined,
      };

      return user;
    } catch (error) {
      throw new Error('Erro ao buscar o usuário');
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.prisma.user.update({
        where: { id },
        data: {
          name: updateUserDto.name,
          age: updateUserDto.age,
        },
      });

      const user = {
        ...updateUser,
        password: undefined,
      };

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuário não encontrado');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return 'Usuário excluído com sucesso';
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuário não encontrado');
      }
      throw error;
    }
  }
}
