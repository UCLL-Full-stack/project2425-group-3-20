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

export {encounterTableRouter} ;