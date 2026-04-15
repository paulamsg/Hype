-- AlterEnum
ALTER TYPE "Folder" ADD VALUE 'EXPIRED';

-- AlterTable
ALTER TABLE "SavedEvent" ALTER COLUMN "folder" SET DEFAULT 'WANT_GO';
