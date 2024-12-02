-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'gameMaster', 'guest');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "EncounterTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EncounterTableToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EncounterTableToMonster_AB_unique" ON "_EncounterTableToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_EncounterTableToMonster_B_index" ON "_EncounterTableToMonster"("B");

-- AddForeignKey
ALTER TABLE "EncounterTable" ADD CONSTRAINT "EncounterTable_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EncounterTableToMonster" ADD CONSTRAINT "_EncounterTableToMonster_A_fkey" FOREIGN KEY ("A") REFERENCES "EncounterTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EncounterTableToMonster" ADD CONSTRAINT "_EncounterTableToMonster_B_fkey" FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
