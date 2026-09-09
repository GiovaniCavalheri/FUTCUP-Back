-- CreateTable
CREATE TABLE "Match" (
    "matchId" SERIAL NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL,
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    "homeTeamsGoals" INTEGER NOT NULL DEFAULT 0,
    "awayTeamsGoals" INTEGER NOT NULL DEFAULT 0,
    "winner" VARCHAR(100),

    CONSTRAINT "Match_pkey" PRIMARY KEY ("matchId")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;
