/*
  Warnings:

  - You are about to drop the column `serial` on the `order` table. All the data in the column will be lost.
  - Added the required column `no` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `serial`,
    ADD COLUMN `no` VARCHAR(256) NOT NULL;
