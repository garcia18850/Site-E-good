import { Router } from 'express';
import { getSystemStatus } from '../controllers/system.controller';

const systemRoutes = Router();

systemRoutes.get('/status', getSystemStatus);

export default systemRoutes;