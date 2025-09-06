/*
  Warnings:

  - Added the required column `username` to the `Collector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Collector" ADD COLUMN     "username" TEXT NOT NULL;
