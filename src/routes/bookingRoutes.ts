import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const router = Router();

router.post('/bookings', BookingController.createBooking);
    router.get('/bookings/:userId', BookingController.listBookings);
router.put('/bookings/:bookingId', BookingController.modifyBooking);
router.delete('/bookings/:bookingId', BookingController.cancelBooking);

export default router;

