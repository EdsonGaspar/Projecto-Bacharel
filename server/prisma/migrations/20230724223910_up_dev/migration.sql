/*
  Warnings:

  - You are about to drop the column `description` on the `parties` table. All the data in the column will be lost.
  - You are about to drop the column `urlfoto` on the `parties` table. All the data in the column will be lost.
  - Added the required column `proposal` to the `parties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parties" DROP COLUMN "description",
DROP COLUMN "urlfoto",
ADD COLUMN     "proposal" TEXT NOT NULL;
