-- CreateTable
CREATE TABLE `Engineer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(64) NOT NULL,
    `address` VARCHAR(256) NOT NULL,
    `tel` CHAR(32) NOT NULL,
    `rate` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
