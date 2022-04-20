export interface IMatchGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends IMatchGoals {
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}
