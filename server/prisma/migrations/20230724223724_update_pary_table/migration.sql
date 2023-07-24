/*
  Warnings:

  - Added the required column `description` to the `parties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parties" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "urlfoto" TEXT,
ALTER COLUMN "votingNumber" DROP NOT NULL;
