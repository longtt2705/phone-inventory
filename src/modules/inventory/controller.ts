import { Phone } from '@prisma/client';
import { Request, Response } from 'express';
import {
    StatusCodes
} from 'http-status-codes';
import service from './service';
import { phoneValidationSchema } from './validator';
import { ErrorResponse, SuccessResponse } from '../../utils/http';

const addPhoneToInventory = async (req: Request, res: Response) => {

    const data = req.body.phone as Phone;
    
    try {
        const { error, value: phone } = phoneValidationSchema.validate(data);
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse(error.message, StatusCodes.BAD_REQUEST));
        }

        const model = await service.getModelById(phone.modelId);
        if (!model) {
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse('Model not found', StatusCodes.BAD_REQUEST));
        }

        const addedPhone = await service.addPhoneToInventory(phone);
        res.status(StatusCodes.CREATED).json(SuccessResponse(addedPhone, 'Phone is registered to inventory', StatusCodes.CREATED));
    } catch (err) {
        console.error('[Inventory.controller.addPhoneToInventory]:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

export default {
    addPhoneToInventory
};