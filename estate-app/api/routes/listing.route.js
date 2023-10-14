import express from 'express';
import { createLisitng } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()

router.post('/create', verifyToken, createLisitng)

export default router

