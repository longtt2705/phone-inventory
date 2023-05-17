import dotenv from 'dotenv';
import express, { Express } from 'express';
import inventoryRouter from './modules/inventory/route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/inventory', inventoryRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});