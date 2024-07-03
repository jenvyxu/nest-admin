-- CreateTable
CREATE TABLE `Engineer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(64) NOT NULL,
    `address` VARCHAR(256) NOT NULL,
    `tel` CHAR(32) NOT NULL,
    `rate` TINYINT NOT NULL DEFAULT 0,
    `orderCount` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `no` VARCHAR(256) NOT NULL,
    `service` VARCHAR(2048) NOT NULL,
    `client_name` CHAR(64) NULL,
    `client_address` VARCHAR(1024) NULL,
    `client_tel` CHAR(32) NULL,
    `price` DECIMAL(65, 30) NULL,
    `final_price` DECIMAL(65, 30) NULL,
    `status` ENUM('created', 'process', 'complete', 'review', 'fail') NOT NULL DEFAULT 'created',
    `review` VARCHAR(256) NULL,
    `engineerId` INTEGER NULL,
    `reject` VARCHAR(256) NULL,
    `note` VARCHAR(256) NULL,
    `rate` TINYINT NULL DEFAULT 0,
    `visit_at` DATETIME(3) NULL,
    `finish_at` DATETIME(3) NULL,
    `expire_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` CHAR(32) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `name` CHAR(64) NULL,
    `address` VARCHAR(256) NULL,
    `tel` CHAR(32) NULL,
    `role` ENUM('0', '1') NOT NULL DEFAULT '0',
    `rate` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
