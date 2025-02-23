/*
  Warnings:

  - Changed the type of `lat` on the `Wastepile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `long` on the `Wastepile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CLEANED', 'REPORTED');

-- AlterTable
ALTER TABLE "Wastepile" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "lat",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
DROP COLUMN "long",
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL;
