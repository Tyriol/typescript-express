import express from 'express';
import type { Router } from 'express'

import { validateNumericId, pleaseAuth } from '../middleware/pets.middleware.js';
import { getPets, getPetById } from '../controllers/pets.controller.js';

const petRouter: Router = express.Router();

petRouter.get('/', getPets)

petRouter.get('/:id', pleaseAuth, validateNumericId, getPetById);

export default petRouter;