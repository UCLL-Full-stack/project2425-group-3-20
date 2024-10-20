-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "str" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "con" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "wis" INTEGER NOT NULL,
    "cha" INTEGER NOT NULL,
    "ac" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "immunities" TEXT[],
    "languages" TEXT[],
    "cr" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "movement" INTEGER NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActionToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToMonster_AB_unique" ON "_ActionToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToMonster_B_index" ON "_ActionToMonster"("B");

-- AddForeignKey
ALTER TABLE "_ActionToMonster" ADD CONSTRAINT "_ActionToMonster_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToMonster" ADD CONSTRAINT "_ActionToMonster_B_fkey" FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
