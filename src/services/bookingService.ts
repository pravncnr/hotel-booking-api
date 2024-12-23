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
      // Validate rooms
      if (bookingData.rooms <= 0) {
        throw new Error('Rooms must be a positive integer');
      }

      // Validate that checkin is before checkout
      if (bookingData.checkin >= bookingData.checkout) {
        throw new Error('Check-in date must be before checkout date');
      }

      // Validate hotel and user IDs
      if (!bookingData.hotel_id || !bookingData.user_id) {
        throw new Error('Hotel ID and User ID must be provided');
      }

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
        // Validate the dates again before updating
        if (updateData.checkin && updateData.checkout && updateData.checkin >= updateData.checkout) {
          throw new Error('Check-in date must be before checkout date');
        }
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
