import { Router } from 'express';
import { HotelController } from '../controllers/hotel.controller';

const router = Router();

router.get('/hotels', HotelController.listHotels);

export default router;

