import prismaClient from '../../database/prisma';

const getUserById = async (id: number) => {
    return await prismaClient().user.findUnique({
        where: {
            id
        },
        include: {
            role: true
        }
    });
};

export default {
    getUserById
};