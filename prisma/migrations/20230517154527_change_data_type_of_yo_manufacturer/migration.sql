/*
  Warnings:

  - Changed the type of `year_of_manufacture` on the `phones` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "phones" DROP COLUMN "year_of_manufacture",
ADD COLUMN     "year_of_manufacture" INTEGER NOT NULL;
