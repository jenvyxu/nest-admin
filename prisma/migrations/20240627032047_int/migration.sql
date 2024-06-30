-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service` VARCHAR(191) NOT NULL,
    `client_name` CHAR(64) NOT NULL,
    `client_address` VARCHAR(256) NOT NULL,
    `client_tel` CHAR(32) NOT NULL,
    `price` DECIMAL(65, 30) NULL,
    `final_price` DECIMAL(65, 30) NULL,
    `status` ENUM('CREATED', 'PROCESSING', 'COMPLETE', 'REVIEW', 'FAIL') NOT NULL DEFAULT 'CREATED',
    `review` VARCHAR(256) NULL,
    `engineerId` INTEGER NULL,
    `reject` VARCHAR(256) NULL,
    `note` VARCHAR(256) NULL,
    `visit_at` DATETIME(3) NOT NULL,
    `finish_at` DATETIME(3) NOT NULL,
    `expire_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` CHAR(32) NULL,
    `password` CHAR(32) NULL,
    `name` CHAR(64) NOT NULL,
    `address` VARCHAR(256) NOT NULL,
    `tel` CHAR(32) NULL,
    `role` ENUM('ADMIN', 'ENEINEER') NOT NULL DEFAULT 'ADMIN',
    `rate` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
