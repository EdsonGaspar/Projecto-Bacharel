-- CreateTable
CREATE TABLE "voters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "bi" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "partyId" TEXT,
    CONSTRAINT "voters_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "proposal" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "voters_email_key" ON "voters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "voters_bi_key" ON "voters"("bi");

-- CreateIndex
CREATE UNIQUE INDEX "parties_nome_key" ON "parties"("nome");
