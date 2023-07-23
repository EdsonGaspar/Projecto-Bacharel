-- CreateTable
CREATE TABLE "voters" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bi" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "partyId" TEXT NOT NULL,

    CONSTRAINT "voters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "votingNumber" INTEGER NOT NULL,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voters_email_key" ON "voters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "voters_bi_key" ON "voters"("bi");

-- CreateIndex
CREATE UNIQUE INDEX "parties_nome_key" ON "parties"("nome");

-- AddForeignKey
ALTER TABLE "voters" ADD CONSTRAINT "voters_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
