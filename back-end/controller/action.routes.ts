/**
 * @swagger
 * components:
 *   schemas:
 *     Action:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The action ID
 *         name:
 *           type: string
 *           description: The action name
 */
import express, { NextFunction, Request, Response } from 'express';
import actionService from '../service/action.service';

const actionRouter = express.Router();

/**
 * @swagger
 * /actions:
 *   get:
 *     summary: Retrieve a list of actions
 *     responses:
 *       200:
 *         description: A list of actions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Action'
 */
actionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const actions = await actionService.getAllActions();
        res.json(actions);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /actions/{id}:
 *   get:
 *     summary: Retrieve a single action by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The action ID
 *     responses:
 *       200:
 *         description: A single action
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Action'
 *       404:
 *         description: Action with id ${id} not found
 */
actionRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const action = await actionService.getActionById(Number(req.params.id));
        res.status(200).json(action);
    } catch (error) {
        return res.status(404).json({ message: (error as Error).message });
    }
});

export default actionRouter;