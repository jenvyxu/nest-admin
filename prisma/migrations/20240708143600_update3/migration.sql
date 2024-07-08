-- AlterTable
ALTER TABLE `engineer` MODIFY `address` VARCHAR(1024) NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `client_address` VARCHAR(2048) NULL,
    MODIFY `review` VARCHAR(2048) NULL,
    MODIFY `reject` VARCHAR(2048) NULL,
    MODIFY `note` VARCHAR(2048) NULL;
