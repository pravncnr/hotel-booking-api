
import { Request, Response } from 'express';
import {UserService} from '../services/userService';

export class UserController {
  static async listUsers(req: Request, res: Response) {
    const { location } = req.query;
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
