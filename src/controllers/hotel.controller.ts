import { Request, Response } from 'express';
import { HotelService } from '../services/hotelService';

export class HotelController {
  static async listHotels(req: Request, res: Response) {
    const { location } = req.query;
    try {
      const hotels = await HotelService.getAllHotels(location as string);
      res.status(200).json(hotels);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
