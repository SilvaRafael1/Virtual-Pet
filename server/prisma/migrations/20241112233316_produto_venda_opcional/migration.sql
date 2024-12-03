-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_vendaId_fkey";

-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "vendaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
