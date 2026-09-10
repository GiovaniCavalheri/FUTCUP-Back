-- CreateTable
CREATE TABLE "Usuario" (
    "idUser" SERIAL NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "role" VARCHAR(15) NOT NULL,
    "password" VARCHAR(50) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUser")
);
