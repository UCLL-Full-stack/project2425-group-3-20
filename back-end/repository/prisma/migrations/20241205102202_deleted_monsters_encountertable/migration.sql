/*
  Warnings:

  - You are about to drop the `_EncounterTableToMonster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EncounterTableToMonster" DROP CONSTRAINT "_EncounterTableToMonster_A_fkey";

-- DropForeignKey
ALTER TABLE "_EncounterTableToMonster" DROP CONSTRAINT "_EncounterTableToMonster_B_fkey";

-- DropTable
DROP TABLE "_EncounterTableToMonster";
