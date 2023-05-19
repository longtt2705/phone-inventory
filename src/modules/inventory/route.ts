import { Router } from 'express';
import authMdw from '../auth/middleware';
import controller from './controller';
import { Roles } from '../../types/enum';

const router = Router();

router.post(
  '/phones',
  authMdw.authenticateJWT,
  authMdw.checkUserRole(Roles.Manager),
  controller.addPhoneToInventory,
);
router.post(
  '/models',
  authMdw.authenticateJWT,
  authMdw.checkUserRole(Roles.Manager),
  controller.addModelToInventory,
);
router.post(
  '/manufacturers',
  authMdw.authenticateJWT,
  authMdw.checkUserRole(Roles.Manager),
  controller.addManufacturerToInventory,
);

router.get(
  '/manufacturers/:id',
  authMdw.authenticateJWT,
  authMdw.checkUserRole(Roles.Manager),
  controller.getManufacturerById,
);
router.get('/phones', authMdw.authenticateJWT, controller.getPhones);
router.get(
  '/models',
  authMdw.authenticateJWT,
  authMdw.checkUserRole(Roles.Manager),
  controller.getModels,
);
router.get('/models/:id', authMdw.authenticateJWT, controller.getModelById);
router.get(
  '/manufacturers',
  authMdw.authenticateJWT,
  authMdw.checkUserRole(Roles.Manager),
  controller.getManufacturers,
);
router.get(
  '/phones/:id',
  authMdw.authenticateJWT,
  authMdw.checkUserRole(Roles.Manager),
  controller.getPhoneById,
);

export default router;
