-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('attack', 'movement', 'spell', 'legendary', 'special');

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "type" "ActionType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);
