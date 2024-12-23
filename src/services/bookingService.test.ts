import { BookingService } from '../services/bookingService';
import { Booking } from '../models';

// Mock the Booking model methods
jest.mock('../models', () => ({
    Booking: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    },
}));

describe('BookingService', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clears mock calls after each test
    });

    describe('createBooking', () => {
        it('should throw an error if rooms is less than or equal to 0', async () => {
            await expect(
                BookingService.createBooking({
                    hotel_id: 1,
                    user_id: 1,
                    rooms: 0,
                    checkin: new Date('2024-12-23'),
                    checkout: new Date('2024-12-24'),
                })
            ).rejects.toThrow('Rooms must be a positive integer');
        });

        it('should throw an error if checkin is after checkout', async () => {
            await expect(
                BookingService.createBooking({
                    hotel_id: 1,
                    user_id: 1,
                    rooms: 2,
                    checkin: new Date('2024-12-25'),
                    checkout: new Date('2024-12-24'),
                })
            ).rejects.toThrow('Check-in date must be before checkout date');
        });

        it('should throw an error if hotel_id or user_id is missing', async () => {
            await expect(
                BookingService.createBooking({
                    hotel_id: 0,
                    user_id: 0,
                    rooms: 2,
                    checkin: new Date('2024-12-23'),
                    checkout: new Date('2024-12-24'),
                })
            ).rejects.toThrow('Hotel ID and User ID must be provided');
        });

        it('should create a booking successfully', async () => {
            const mockBooking = {
                id: 1,
                user_id: 1,
                hotel_id: 1,
                rooms: 2,
                checkin: new Date('2024-12-23'),
                checkout: new Date('2024-12-24'),
                created_at: new Date(),
                updated_at: new Date(),
            };

            (Booking.create as jest.Mock).mockResolvedValue(mockBooking);

            const result = await BookingService.createBooking({
                hotel_id: 1,
                user_id: 1,
                rooms: 2,
                checkin: new Date('2024-12-23'),
                checkout: new Date('2024-12-24'),
            });

            expect(result).toEqual(mockBooking);
            expect(Booking.create).toHaveBeenCalledWith({
                hotel_id: 1,
                user_id: 1,
                rooms: 2,
                checkin: expect.any(Date),
                checkout: expect.any(Date),
                id: null,
                created_at: expect.any(Date),
                updated_at: expect.any(Date),
            });
        });
    });

    describe('modifyBooking', () => {
        it('should throw an error if checkin is after checkout', async () => {
            const mockBooking = {
                id: 1,
                user_id: 1,
                hotel_id: 1,
                rooms: 2,
                checkin: new Date('2024-12-23'),
                checkout: new Date('2024-12-24'),
                created_at: new Date(),
                updated_at: new Date(),
                update: jest.fn().mockResolvedValue(true),
            };

            (Booking.findByPk as jest.Mock).mockResolvedValue(mockBooking);

            await expect(
                BookingService.modifyBooking(1, {
                    checkin: new Date('2024-12-25'),
                    checkout: new Date('2024-12-24'),
                })
            ).rejects.toThrow('Check-in date must be before checkout date');
        });

        it('should update a booking successfully', async () => {
            const mockBooking = {
                id: 1,
                user_id: 1,
                hotel_id: 1,
                rooms: 2,
                checkin: new Date('2024-12-23'),
                checkout: new Date('2024-12-24'),
                created_at: new Date(),
                updated_at: new Date(),
                update: jest.fn().mockResolvedValue(true),
            };

            (Booking.findByPk as jest.Mock).mockResolvedValue(mockBooking);

            const updatedBooking = await BookingService.modifyBooking(1, {
                checkin: new Date('2024-12-26'),
                checkout: new Date('2024-12-27'),
            });

            expect(updatedBooking).toEqual(mockBooking);
            expect(mockBooking.update).toHaveBeenCalledWith({
                checkin: expect.any(Date),
                checkout: expect.any(Date),
            });
        });
    });

    describe('cancelBooking', () => {
        it('should throw an error if booking not found', async () => {
            (Booking.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(BookingService.cancelBooking(1)).rejects.toThrow('Booking not found');
        });

        it('should cancel a booking successfully', async () => {
            const mockBooking = {
                id: 1,
                destroy: jest.fn(),
            };

            (Booking.findByPk as jest.Mock).mockResolvedValue(mockBooking);

            const response = await BookingService.cancelBooking(1);

            expect(response).toEqual({ message: 'Booking cancelled successfully' });
            expect(mockBooking.destroy).toHaveBeenCalled();
        });
    });
});
