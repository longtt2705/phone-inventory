import { Phone } from '@prisma/client';
import prismaClient from '../../database/prisma';

const addPhoneToInventory = (phone: Phone) => {
    return prismaClient().phone.create({
        data: phone
    });
};

const getModelById = (id: number) => {
    return prismaClient().model.findUnique({
        where: {
            id
        }
    });
};

export default {
    addPhoneToInventory,
    getModelById
};