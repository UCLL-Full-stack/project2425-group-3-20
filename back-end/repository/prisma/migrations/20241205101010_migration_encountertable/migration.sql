/*
  Warnings:

  - You are about to drop the `_ActionToEncounterTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActionToEncounterTable" DROP CONSTRAINT "_ActionToEncounterTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActionToEncounterTable" DROP CONSTRAINT "_ActionToEncounterTable_B_fkey";

-- DropTable
DROP TABLE "_ActionToEncounterTable";
