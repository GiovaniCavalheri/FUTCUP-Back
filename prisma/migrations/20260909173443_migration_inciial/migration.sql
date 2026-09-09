-- CreateTable
CREATE TABLE "Player" (
    "playerId" SERIAL NOT NULL,
    "namePlayer" VARCHAR(100) NOT NULL,
    "imgPlayer" TEXT,
    "position" VARCHAR(50) NOT NULL,
    "numberTshirt" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamId" SERIAL NOT NULL,
    "nameTeam" VARCHAR(100) NOT NULL,
    "imgShield" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "News" (
    "newsId" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "imgNews" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("newsId")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;
