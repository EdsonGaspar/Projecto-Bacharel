-- DropForeignKey
ALTER TABLE "voters" DROP CONSTRAINT "voters_partyId_fkey";

-- AlterTable
ALTER TABLE "voters" ALTER COLUMN "partyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "voters" ADD CONSTRAINT "voters_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
