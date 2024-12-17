import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import actionRouter from './controller/action.routes';
import monsterRouter from './controller/monster.routes';
import { userRouter } from './controller/user.routes';
import encounterTableRouter from './controller/encounterTable.routes';
import { expressjwt } from 'express-jwt';
import { encounterTableRouter } from './controller/encounterTable.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/api-docs',
            '/users/login',
            '/users/signup',
            '/monsters/all',
            '/status',
            '/monsters',
            '/encounterTables'
        ],
    })
);
app.use('/actions', actionRouter);

app.use('/monsters', monsterRouter);

app.use('/users',userRouter)

app.use('/encounterTables',encounterTableRouter)