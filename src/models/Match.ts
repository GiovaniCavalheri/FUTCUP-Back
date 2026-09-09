enum StateMath 
{
    "Agendado", 
    "Ao_Vivo",
    "Finalizado"
}
interface Math {
    mathId: string, 
    date: Date, 
    homeTeamId: string, 
    awayTeamId: string, 
    homeTeamsGoals: number, 
    awayTeamsGoals: number,
    winner: string, 
    status: StateMath; 
}