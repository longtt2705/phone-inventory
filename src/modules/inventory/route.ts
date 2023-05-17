import { Router } from 'express';
import authMdw from '../auth/middleware';
import controller from './controller';
import { Roles } from '../../types/enum';

const router = Router();

router.post('/phones', authMdw.authenticateJWT, authMdw.checkUserRole(Roles.Manager), controller.addPhoneToInventory);

export default router;