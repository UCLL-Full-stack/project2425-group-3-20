/**
 * @swagger
 * components:
 *   schemas:
 *     Monster:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *           description: Unique identifier for the monster.
 *         name:
 *           type: string
 *           description: The name of the monster.
 *         str:
 *           type: integer
 *           description: The monster's strength score.
 *         dex:
 *           type: integer
 *           description: The monster's dexterity score.
 *         con:
 *           type: integer
 *           description: The monster's constitution score.
 *         int:
 *           type: integer
 *           description: The monster's intelligence score.
 *         wis:
 *           type: integer
 *           description: The monster's wisdom score.
 *         cha:
 *           type: integer
 *           description: The monster's charisma score.
 *         actions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Action'
 *           description: A list of actions available to the monster.
 *         ac:
 *           type: integer
 *           description: The monster's armor class.
 *         hp:
 *           type: integer
 *           description: The monster's hit points.
 *         immunities:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of conditions or damage types the monster is immune to.
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *           description: Languages the monster can speak or understand.
 *         cr:
 *           type: string
 *           description: The challenge rating of the monster.
 *         type:
 *           type: string
 *           description: The type or classification of the monster.
 *         movement:
 *           type: integer
 *           description: The movement speed of the monster (in feet).
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: The user who created or owns the monster.
 *     MonsterInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the monster.
 *         str:
 *           type: integer
 *           description: The monster's strength score.
 *         dex:
 *           type: integer
 *           description: The monster's dexterity score.
 *         con:
 *           type: integer
 *           description: The monster's constitution score.
 *         int:
 *           type: integer
 *           description: The monster's intelligence score.
 *         wis:
 *           type: integer
 *           description: The monster's wisdom score.
 *         cha:
 *           type: integer
 *           description: The monster's charisma score.
 *         ac:
 *           type: integer
 *           description: The monster's armor class.
 *         hp:
 *           type: integer
 *           description: The monster's hit points.
 *         immunities:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of conditions or damage types the monster is immune to.
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *           description: Languages the monster can speak or understand.
 *         cr:
 *           type: string
 *           description: The challenge rating of the monster.
 *         type:
 *           type: string
 *           description: The type or classification of the monster.
 *         movement:
 *           type: integer
 *           description: The movement speed of the monster (in feet).
 *         ownername:
 *           type: string
 *           description: The type or classification of the monster.
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         password:
 *           type: string
 *           description: The user's password.
 *           format: password
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *           description: The role assigned to the user.
 *     Role:
 *       type: string
 *       enum:
 *         - guest
 *         - gameMaster
 *         - admin
 *       description: The role of the user, determining their permissions.
 */

import express, { NextFunction, Request, Response } from 'express';
import monsterService from '../service/monster.service';
import { MonsterInput, Role } from '../types';

const monsterRouter = express.Router();

/**
 * @swagger
 * /monsters/all:
 *   get:
 *     summary: Retrieve a list of monsters
 *     responses:
 *       200:
 *         description: A list of monsters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Monster'
 */
monsterRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const monsters = await monsterService.getAllMonsters();
        res.json(monsters);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /monsters/{monsterId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a monster action by monster ID and action ID, then return the associated monster
 *     parameters:
 *       - in: path
 *         name: monsterId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The monster ID
 *     responses:
 *       200:
 *         description: Monster action deleted successfully, returning the associated monster
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Monster action deleted successfully"
 *                 monster:
 *                   $ref: '#/components/schemas/Monster'
 *       404:
 *         description: Monster or action with the specified IDs not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Monster with ID not found"
 */
monsterRouter.put('/:monsterId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const monsters = await monsterService.deleteMonsterActions(Number(req.params.monsterId));
        res.json(monsters);
    } catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /monsters/own:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a list of monsters by user ID
 *     responses:
 *       200:
 *         description: A list of monsters associated with the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Monster'
 *       404:
 *         description: User with the specified ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User  with ID not found"
 */
monsterRouter.get('/own',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { name: string; role: Role } };
        const { name, role } = request.auth
        const monsters = await monsterService.getMonstersByUser(name);
        res.json(monsters);
    } catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /monsters:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new monster
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MonsterInput'
 *     responses:
 *       200:
 *         description: Monster created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid monster data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
monsterRouter.post('/', async (req:Request, res:Response,next:NextFunction) => {
    try {
        const monsterInput: MonsterInput = req.body;
        const monster = await monsterService.createMonster(monsterInput);
        res.json(monster);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default monsterRouter;