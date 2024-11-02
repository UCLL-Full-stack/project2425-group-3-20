/**
 * @swagger
 * components:
 *   schemas:
 *     Monster:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The monster ID
 *         name:
 *           type: string
 *           description: The monster name
 *         str:
 *           type: integer
 *           description: The monster strength
 *         dex:
 *           type: integer
 *           description: The monster dexterity
 *         con:
 *           type: integer
 *           description: The monster constitution
 *         int:
 *           type: integer
 *           description: The monster intelligence
 *         wis:
 *           type: integer
 *           description: The monster wisdom
 *         cha:
 *           type: integer
 *           description: The monster charisma
 *         actions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Action'
 *           description: The monster actions
 *         ac:
 *           type: integer
 *           description: The monster armor class
 *         hp:
 *           type: integer
 *           description: The monster hit points
 *         immunities:
 *           type: array
 *           items:
 *             type: string
 *           description: The monster immunities
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *           description: The monster languages
 *         cr:
 *           type: string
 *           description: The monster challenge rating
 *         type:
 *           type: string
 *           description: The monster type
 *         movement:
 *           type: integer
 *           description: The monster movement speed
 */
import express, { NextFunction, Request, Response } from 'express';
import monsterService from '../service/monster.service';

const monsterRouter = express.Router();

/**
 * @swagger
 * /monsters:
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
monsterRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
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
export default monsterRouter;