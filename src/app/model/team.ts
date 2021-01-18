export class Team {
    _id: string;
    team_name: string;
    wins: number;
    losses: number;
    ties: number;
    score: number;

    constructor(id: string, teamName: string, wins: number, losses: number, ties: number, score: number) {
        this._id = id;
        this.team_name = teamName;
        this.wins = wins;
        this.losses = losses;
        this.ties = ties;
        this.score = score;
    }
}