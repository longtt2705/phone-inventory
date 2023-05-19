import { Model, Phone } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse, SuccessResponse } from '../../utils/http';
import service from './service';
import {
  manufacturerValidationSchema,
  modelValidationSchema,
  phoneValidationSchema,
} from './validator';

const addPhoneToInventory = async (req: Request, res: Response) => {
  const data = req.body.phone as Phone;

  try {
    const { error, value: phone } = phoneValidationSchema.validate(data);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse(error.message, StatusCodes.BAD_REQUEST));
    }

    const model = await service.getModelById(phone.modelId);
    if (!model) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse('Model not found', StatusCodes.BAD_REQUEST));
    }

    const addedPhone = await service.addPhoneToInventory(phone);
    res
      .status(StatusCodes.CREATED)
      .json(
        SuccessResponse(
          addedPhone,
          'Phone is registered to inventory',
          StatusCodes.CREATED,
        ),
      );
  } catch (err) {
    console.error('[Inventory.controller.addPhoneToInventory]:', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

const addModelToInventory = async (req: Request, res: Response) => {
  const data = req.body.model as Model;

  try {
    const { error, value: model } = modelValidationSchema.validate(data);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse(error.message, StatusCodes.BAD_REQUEST));
    }

    const addedModel = await service.addModelToInventory(model);
    res
      .status(StatusCodes.CREATED)
      .json(
        SuccessResponse(
          addedModel,
          'Model is registered to inventory',
          StatusCodes.CREATED,
        ),
      );
  } catch (err) {
    console.error('[Inventory.controller.addModelToInventory]:', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

const addManufacturerToInventory = async (req: Request, res: Response) => {
  const manufacturer = req.body.manufacturer;
  try {
    const { error } = manufacturerValidationSchema.validate(manufacturer);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse(error.message, StatusCodes.BAD_REQUEST));
    }

    const addedManufacturer = await service.addManufacturerToInventory(
      manufacturer.name,
    );
    res
      .status(StatusCodes.CREATED)
      .json(
        SuccessResponse(
          addedManufacturer,
          'Manufacturer is registered to inventory',
          StatusCodes.CREATED,
        ),
      );
  } catch (err) {
    console.error('[Inventory.controller.addManufacturerToInventory]:', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

const getPhones = async (req: Request, res: Response) => {
  try {
    const phones = await service.getPhones();
    res
      .status(StatusCodes.OK)
      .json(SuccessResponse(phones, 'Phones retrieved', StatusCodes.OK));
  } catch (err) {
    console.error('[Inventory.controller.getPhones]:', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

const getModels = async (req: Request, res: Response) => {
  try {
    const models = await service.getModels();
    res
      .status(StatusCodes.OK)
      .json(SuccessResponse(models, 'Models retrieved', StatusCodes.OK));
  } catch (err) {
    console.error('[Inventory.controller.getModels]:', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

const getManufacturers = async (req: Request, res: Response) => {
  try {
    const manufacturers = await service.getManufacturers();
    res
      .status(StatusCodes.OK)
      .json(
        SuccessResponse(
          manufacturers,
          'Manufacturers retrieved',
          StatusCodes.OK,
        ),
      );
  } catch (err) {
    console.error('[Inventory.controller.getManufacturers]:', err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

const getPhoneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const phone = await service.getPhoneById(+id);
    res
      .status(StatusCodes.OK)
      .json(SuccessResponse(phone, 'Phone retrieved', StatusCodes.OK));
  } catch (error) {
    console.error('[Inventory.controller.getPhoneById]:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

const getModelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const model = await service.getModelById(+id);
    res
      .status(StatusCodes.OK)
      .json(SuccessResponse(model, 'Model retrieved', StatusCodes.OK));
  } catch (error) {
    console.error('[Inventory.controller.getModelById]:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

const getManufacturerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const manufacturer = await service.getManufacturerById(+id);
    res
      .status(StatusCodes.OK)
      .json(
        SuccessResponse(manufacturer, 'Manufacturer retrieved', StatusCodes.OK),
      );
  } catch (error) {
    console.error('[Inventory.controller.getManufacturerById]:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse(
          'Internal server error',
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
  }
};

export default {
  addPhoneToInventory,
  getPhones,
  getModels,
  addModelToInventory,
  addManufacturerToInventory,
  getManufacturers,
  getPhoneById,
  getModelById,
  getManufacturerById,
};
