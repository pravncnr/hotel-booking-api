import express, { Request, Response } from 'express';
import hotelRoutes from './routes/hotelRoutes';
import bookingRoutes from './routes/bookingRoutes';
import  userRoutes from './routes/userRoutes';
import  cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use('/api/', hotelRoutes);
app.use('/api/', bookingRoutes);
app.use('/api/', userRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('Hotel Booking API');
});

export default app;

