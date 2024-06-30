/*
  Warnings:

  - Made the column `rate` on table `engineer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `engineer` ADD COLUMN `orderCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `rate` TINYINT NOT NULL DEFAULT 0;
