/*
  Warnings:

  - You are about to drop the column `link` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "link",
ADD COLUMN     "image" TEXT;
