import { Model, Phone } from '@prisma/client';
import prismaClient from '../../database/prisma';

const addPhoneToInventory = (phone: Phone) => {
  return prismaClient().phone.create({
    data: phone,
  });
};

const getModelById = (id: number) => {
  return prismaClient().model.findUnique({
    where: {
      id,
    },
  });
};

const addModelToInventory = (model: Model) => {
  return prismaClient().model.create({
    data: model,
  });
};

const addManufacturerToInventory = (name: string) => {
  return prismaClient().manufacturer.create({
    data: {
      name,
    },
  });
};

const getModels = () => {
  return prismaClient().model.findMany();
};

const getManufacturers = () => {
  return prismaClient().manufacturer.findMany();
};

const getPhones = () => {
  return prismaClient().phone.findMany({
    include: {
      Model: {
        include: {
          manufacturer: true,
        },
      },
    },
  });
};

const getPhoneById = (id: number) => {
  return prismaClient().phone.findUnique({
    where: {
      id,
    },
    include: {
      Model: {
        include: {
          manufacturer: true,
        },
      },
    },
  });
};

const getManufacturerById = (id: number) => {
  return prismaClient().manufacturer.findUnique({
    where: {
      id,
    },
  });
};

export default {
  addPhoneToInventory,
  getModelById,
  addModelToInventory,
  addManufacturerToInventory,
  getModels,
  getPhones,
  getManufacturers,
  getPhoneById,
  getManufacturerById,
};
