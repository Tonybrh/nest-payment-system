/*
  Warnings:

  - Added the required column `symbol` to the `Btc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Btc" ADD COLUMN     "symbol" TEXT NOT NULL;
