/*
  Warnings:

  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `username` CHAR(32) NOT NULL,
    MODIFY `password` CHAR(32) NOT NULL,
    MODIFY `name` CHAR(64) NULL,
    MODIFY `updated_at` DATETIME(3) NULL,
    MODIFY `deleted_at` DATETIME(3) NULL;
