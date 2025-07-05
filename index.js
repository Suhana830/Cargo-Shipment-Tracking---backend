import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';
import Retrievalroute from './router/retrievalRoute.js';
import shipingOperation from './router/shipingOperation.js'
import cors from 'cors';


dotenv.config();
const app = express();
app.use(express.json());
connectDB();


const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only requests from this origin
    methods: ['GET', 'POST'], // Allow only these methods

    credentials: true
};

app.use(cors(corsOptions));

app.use('/shipments', Retrievalroute);
app.use('/shipment', shipingOperation)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})