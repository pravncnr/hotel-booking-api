import { Request, Response } from 'express';
import { BookingService } from '../services/bookingService';

export class BookingController {
  // Create a booking
  static async createBooking(req: Request, res: Response) {
    const { userId, hotelId, rooms, checkin, checkout } = req.body;
    console.log("here", checkin, checkout, req.body)
    try {
      const booking = await BookingService.createBooking({user_id: userId, hotel_id: hotelId, rooms, checkin: new Date(checkin), checkout: new Date(checkout)});
      res.status(201).json(booking);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  // List all bookings for a user
  static async listBookings(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const bookings = await BookingService.getAllBookings(Number(userId));
      res.status(200).json(bookings);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  // Modify a booking
  static async modifyBooking(req: Request, res: Response) {
    const { bookingId } = req.params;
    const { checkin, checkout } = req.body;
    try {
      const updatedBooking = await BookingService.modifyBooking( Number(bookingId), {checkin: new Date(checkin), checkout: new Date(checkout)});
      res.status(200).json(updatedBooking);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  // Cancel a booking
  static async cancelBooking(req: Request, res: Response) {
    const { bookingId } = req.params;
    try {
      const response = await BookingService.cancelBooking(Number(bookingId));
      res.status(200).json(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
