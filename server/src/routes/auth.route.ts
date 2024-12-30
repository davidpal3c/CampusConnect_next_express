import express from 'express';
import { login } from '../controllers/auth.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', authenticateUser, login);