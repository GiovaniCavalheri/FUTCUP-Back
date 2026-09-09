-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Agendado', 'Ao_Vivo', 'Finalizado');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Agendado';
