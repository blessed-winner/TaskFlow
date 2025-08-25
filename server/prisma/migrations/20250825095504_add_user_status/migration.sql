-- CreateEnum
CREATE TYPE "public"."userStatus" AS ENUM ('ACTIVE', 'AWAY');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "status" "public"."userStatus" NOT NULL DEFAULT 'AWAY';
