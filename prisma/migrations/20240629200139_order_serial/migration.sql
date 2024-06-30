/*
  Warnings:

  - Added the required column `serial` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `serial` VARCHAR(256) NOT NULL,
    MODIFY `service` VARCHAR(2048) NOT NULL;
