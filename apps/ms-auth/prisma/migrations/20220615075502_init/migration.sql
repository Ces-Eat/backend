-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(35) NOT NULL,
    `surname` VARCHAR(35) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `isSuspended` BOOLEAN NOT NULL DEFAULT false,
    `roleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Referent` (
    `id` VARCHAR(191) NOT NULL,
    `referentUserId` VARCHAR(191) NOT NULL,
    `newUserId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Referent_newUserId_key`(`newUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referent` ADD CONSTRAINT `Referent_referentUserId_fkey` FOREIGN KEY (`referentUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referent` ADD CONSTRAINT `Referent_newUserId_fkey` FOREIGN KEY (`newUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
