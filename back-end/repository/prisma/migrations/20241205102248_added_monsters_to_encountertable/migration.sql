-- CreateTable
CREATE TABLE "_EncounterTableToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EncounterTableToMonster_AB_unique" ON "_EncounterTableToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_EncounterTableToMonster_B_index" ON "_EncounterTableToMonster"("B");

-- AddForeignKey
ALTER TABLE "_EncounterTableToMonster" ADD CONSTRAINT "_EncounterTableToMonster_A_fkey" FOREIGN KEY ("A") REFERENCES "EncounterTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EncounterTableToMonster" ADD CONSTRAINT "_EncounterTableToMonster_B_fkey" FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
