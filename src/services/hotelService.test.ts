import { HotelService } from '../services/hotelService';  // Adjust the import as per your folder structure
import { Hotel } from '../models';
import { Op } from 'sequelize';



jest.mock('../models', () => ({
    Hotel: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    },
}));

describe('HotelService', () => {
    let mockHotel:any;

    beforeEach(() => {
        mockHotel = Hotel; // Reference to the mocked Hotel model
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('getAllHotels', () => {
        it('should return all hotels without a location filter', async () => {
            const mockResponse = [
                { id: 1, name: 'Hotel A', location: 'Location A' },
                { id: 2, name: 'Hotel B', location: 'Location B' },
            ];

            // Mock the response for Hotel.findAll
            mockHotel.findAll.mockResolvedValue(mockResponse);

            const result = await HotelService.getAllHotels();

            expect(result).toEqual(mockResponse);
            expect(mockHotel.findAll).toHaveBeenCalledWith({ where: {} });
        });

        it('should return hotels filtered by location', async () => {
            const location = 'Location A';
            const mockResponse = [
                { id: 1, name: 'Hotel A', location: 'Location A' },
            ];

            // Mock the response for Hotel.findAll
            mockHotel.findAll.mockResolvedValue(mockResponse);

            const result = await HotelService.getAllHotels(location);

            expect(result).toEqual(mockResponse);
            expect(mockHotel.findAll).toHaveBeenCalledWith({
                where: {
                    location: { [Op.like]: `%${location}%` }
                }
            });
        });

        it('should return an empty array if no hotels match the location', async () => {
            const location = 'Non-Existing Location';
            const mockResponse: [] = [];

            // Mock the response for Hotel.findAll
            mockHotel.findAll.mockResolvedValue(mockResponse);

            const result = await HotelService.getAllHotels(location);

            expect(result).toEqual(mockResponse);
            expect(mockHotel.findAll).toHaveBeenCalledWith({
                where: {
                    location: { [Op.like]: `%${location}%` }
                }
            });
        });

        it('should handle errors and throw an exception', async () => {
            // Simulating an error during the database call
            mockHotel.findAll.mockRejectedValue(new Error('Database error'));

            await expect(HotelService.getAllHotels('Location A'))
                .rejects
                .toThrowError('Database error');
        });
    });
});
