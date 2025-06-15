/*
  Warnings:

  - The `admin_approval` column on the `booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `corp_approval` column on the `booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Approval" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "admin_approval",
ADD COLUMN     "admin_approval" "Approval" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "corp_approval",
ADD COLUMN     "corp_approval" "Approval" NOT NULL DEFAULT 'PENDING';
