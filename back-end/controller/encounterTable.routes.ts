/**
 * @swagger
 * components:
 *   schemas:
 *     EncounterTable:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The encounter table ID
 *         name:
 *           type: string
 *           description: The encounter table name
 *         monsters:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Monster'
 *           description: The monsters in the encounter table
 */
import express, { NextFunction, Request, Response } from 'express';
import encounterTableService from '../service/encounterTable.service';

const encounterTableRouter = express.Router();

/**
 * @swagger
 * /encounterTables:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a list of encounter tables
 *     responses:
 *       200:
 *         description: A list of encounter tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EncounterTable'
 */
encounterTableRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const encounterTables = await encounterTableService.getAllEncounterTables();
        res.json(encounterTables);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /encounterTables/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a single encounter table by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The encounter table ID
 *     responses:
 *       200:
 *         description: A single encounter table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncounterTable'
 */
encounterTableRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const encounterTable = await encounterTableService.getEncounterTableById(parseInt(req.params.id));
        res.json(encounterTable);
    } catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /encounterTables/{id}/{monsterid}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove a monster from an encounter table
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The encounter table ID
 *       - in: path
 *         name: monsterid
 *         required: true
 *         schema:
 *           type: integer
 *         description: The monster ID to remove
 *     responses:
 *       200:
 *         description: The updated encounter table after removing the monster
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncounterTable'
 *       404:
 *         description: Encounter table or monster not found
 *       500:
 *         description: Internal server error
 */
encounterTableRouter.put('/:id/:monsterid', async (req:Request, res: Response,next:NextFunction)=>{
    try{
        const encounterTable =  await encounterTableService.deleteMonsterFromEncounterTable(parseInt(req.params.id),parseInt(req.params.monsterid))
        res.json(encounterTable)
    }catch (err){
        next(err)
    }
})

export {encounterTableRouter} ;