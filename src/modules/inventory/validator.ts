import { Phone } from '@prisma/client';
import Joi from 'joi';

export const phoneValidationSchema = Joi.object<Phone>({
  price: Joi.number().positive().required(),
  modelId: Joi.number().integer().positive().required(),
  bodyColor: Joi.string().required(),
  dataMemory: Joi.number().positive().required(),
  osVersion: Joi.string().required(),
  yearOfManufacture: Joi.number().integer().min(2000).required(),
});

export const manufacturerValidationSchema = Joi.object({
  name: Joi.string().required(),
});

export const modelValidationSchema = Joi.object({
  name: Joi.string().required(),
  manufacturerId: Joi.number().integer().positive().required(),
});
