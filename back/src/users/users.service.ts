import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  private usersData = [
    {
      id: 1,
      name: 'Dave',
      age: 12,
      hobby: 'football',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Meo',
      age: 5,
      hobby: 'sleep',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Pony',
      age: 6,
      hobby: 'read',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Al',
      age: 42,
      hobby: 'eat',
      role: 'INTERN',
    },
  ];
  constructor(private prisma: PrismaService) {}

  getAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      return this.prisma.user.findMany({
        where: {
          role: role,
        },
      });
    } else {
      return this.prisma.user.findMany();
    }
  }

  getOne(id: number) {
    return this.usersData.find((user) => user.id === id);
  }

  createUser(user: {
    name: string;
    age: number;
    hobby: string;
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
  }) {
    const usersByHighestId = [...this.usersData].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.usersData.push(newUser);
    return newUser;
    // this.prisma.user.create({ data: { ...user } });
  }

  updateUser(
    id: number,
    userUpdate: {
      name?: string;
      age?: number;
      hobby?: string;
      role?: 'INTERN' | 'ADMIN' | 'ENGINEER';
    },
  ) {
    this.usersData = this.usersData.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });
    return this.getOne(id);
  }

  deleteUser(id: number) {
    const removeUser = this.getOne(id);
    this.usersData = this.usersData.filter((user) => user.id !== id);
    return removeUser;
  }
}
