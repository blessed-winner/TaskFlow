/*
  Warnings:

  - You are about to drop the `_UsersTasks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_UsersTasks" DROP CONSTRAINT "_UsersTasks_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UsersTasks" DROP CONSTRAINT "_UsersTasks_B_fkey";

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_UsersTasks";

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
