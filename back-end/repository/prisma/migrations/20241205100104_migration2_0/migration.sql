-- CreateTable
CREATE TABLE "_ActionToEncounterTable" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToEncounterTable_AB_unique" ON "_ActionToEncounterTable"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToEncounterTable_B_index" ON "_ActionToEncounterTable"("B");

-- AddForeignKey
ALTER TABLE "_ActionToEncounterTable" ADD CONSTRAINT "_ActionToEncounterTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToEncounterTable" ADD CONSTRAINT "_ActionToEncounterTable_B_fkey" FOREIGN KEY ("B") REFERENCES "EncounterTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
