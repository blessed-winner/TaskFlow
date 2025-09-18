-- CreateEnum
CREATE TYPE "public"."Notification_type" AS ENUM ('NEW_TASK', 'CREATE_USER', 'TOGGLE_IN_PROGRESS', 'TOGGLE_COMPLETED', 'DELETE_TASK', 'DELETE_USER', 'UPDATE_USER', 'UPDATE_TASK');

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" SERIAL NOT NULL,
    "type" "public"."Notification_type" NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
