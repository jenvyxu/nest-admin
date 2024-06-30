/*
  Warnings:

  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `client_name` CHAR(64) NULL,
    MODIFY `client_address` VARCHAR(256) NULL,
    MODIFY `client_tel` CHAR(32) NULL,
    MODIFY `status` ENUM('created', 'process', 'complete', 'review', 'fail') NOT NULL DEFAULT 'created',
    MODIFY `visit_at` DATETIME(3) NULL,
    MODIFY `finish_at` DATETIME(3) NULL,
    MODIFY `expire_at` DATETIME(3) NULL,
    MODIFY `updated_at` DATETIME(3) NULL,
    MODIFY `deleted_at` DATETIME(3) NULL;
