import request from 'supertest';
import { HotelController } from '../controllers/hotel.controller';
import { HotelService } from '../services/hotelService';
import express from 'express';

jest.mock('../services/hotelService');

describe('HotelController', () => {
    let app:any;

    beforeEach(() => {
        app = express();
        app.get('/hotels', HotelController.listHotels);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('listHotels', () => {
        it('should return hotels with a location filter', async () => {
            const location = 'Location A';
            const mockResponse = [
                { id: 1, name: 'Hotel A', location: 'Location A' },
            ];

            (HotelService.getAllHotels as jest.Mock).mockResolvedValue(mockResponse);

            const response = await request(app).get('/hotels').query({ location });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
            expect(HotelService.getAllHotels).toHaveBeenCalledWith(location);
        });

        it('should return all hotels if no location filter is provided', async () => {
            const mockResponse = [
                { id: 1, name: 'Hotel A', location: 'Location A' },
                { id: 2, name: 'Hotel B', location: 'Location B' },
            ];

            // Mock the service method to return mocked data
            (HotelService.getAllHotels as jest.Mock).mockResolvedValue(mockResponse);

            const response = await request(app).get('/hotels');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
            expect(HotelService.getAllHotels).toHaveBeenCalledWith(undefined);
        });

        it('should handle errors and return a 500 status', async () => {
            const errorMessage = 'Database error';

            (HotelService.getAllHotels as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const response = await request(app).get('/hotels').query({ location: 'Location A' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: errorMessage });
        });

        it('should handle unknown errors and return a 500 status', async () => {
            (HotelService.getAllHotels as jest.Mock).mockRejectedValue(new Error());

            const response = await request(app).get('/hotels').query({ location: 'Location A' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: '' });
        });
    });
});
