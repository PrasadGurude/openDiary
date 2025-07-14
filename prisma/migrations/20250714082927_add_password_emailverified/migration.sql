/*
  Warnings:

  - A unique constraint covering the columns `[suggestionId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `suggestionId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "suggestionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Project_suggestionId_key" ON "Project"("suggestionId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "ProjectSuggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
