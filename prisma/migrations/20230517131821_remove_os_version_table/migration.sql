/*
  Warnings:

  - You are about to drop the column `os_version_id` on the `phones` table. All the data in the column will be lost.
  - You are about to drop the `os_versions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `os_version` to the `phones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "phones" DROP CONSTRAINT "phones_os_version_id_fkey";

-- AlterTable
ALTER TABLE "phones" DROP COLUMN "os_version_id",
ADD COLUMN     "os_version" TEXT NOT NULL;

-- DropTable
DROP TABLE "os_versions";
