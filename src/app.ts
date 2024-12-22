import express, { Request, Response } from 'express';
import hotelRoutes from './routes/hotelRoutes';
import bookingRoutes from './routes/bookingRoutes';
import  userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/api/', hotelRoutes);
app.use('/api/', bookingRoutes);
app.use('/api/', userRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('Hotel Booking API');
});

export default app;

