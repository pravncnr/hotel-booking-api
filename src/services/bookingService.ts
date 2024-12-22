import { Booking } from '../models';


export class BookingService {
  static async createBooking(bookingData: {
    hotel_id: number;
    user_id: number;
    rooms: number;
    checkin: Date;
    checkout: Date;
  }) {
    try {
      const booking = await Booking.create({
        ...bookingData,
        id: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return booking;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  static async getAllBookings(userId: number) {
    try {
      const bookings = await Booking.findAll({
        where: { user_id: userId },
      });
      return bookings;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  static async modifyBooking(bookingId: number, updateData: any) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (booking) {
        await booking.update(updateData);
        return booking;
      } else {
        throw new Error('Booking not found');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  static async cancelBooking(bookingId: number) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (booking) {
        await booking.destroy();
        return { message: 'Booking cancelled successfully' };
      } else {
        throw new Error('Booking not found');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}
