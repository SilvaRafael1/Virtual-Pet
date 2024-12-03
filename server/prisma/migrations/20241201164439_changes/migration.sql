/*
  Warnings:

  - You are about to drop the column `vendaId` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `vendaId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Venda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_vendaId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_vendaId_fkey";

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "vendaId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "vendaId",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProdutoVenda" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "vendaId" INTEGER NOT NULL,

    CONSTRAINT "ProdutoVenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoVenda" ADD CONSTRAINT "ProdutoVenda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoVenda" ADD CONSTRAINT "ProdutoVenda_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
