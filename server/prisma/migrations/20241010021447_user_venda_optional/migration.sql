-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_vendaId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "vendaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
