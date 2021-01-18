import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../model/team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-assign-result-dialog',
  templateUrl: './assign-result-dialog.component.html',
  styleUrls: ['./assign-result-dialog.component.css']
})
export class AssignResultDialogComponent implements OnInit {

  winnerIndex?: number;
  winnerId?: string = "0";
  looserId?: string="0";
  teamsToAssign: Team[];

  constructor(
    private dialogRef: MatDialogRef<AssignResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any, private teamService: TeamService) {
    this.teamsToAssign = data.teamsToAssign
  }

  ngOnInit(): void {

  }

  save() {
    console.log("Winner Index:" + this.winnerIndex);
    if (this.winnerIndex == 0)
      this.winnerId = this.teamsToAssign[0]._id;
    else if (this.winnerIndex == 1)
      this.winnerId = this.teamsToAssign[1]._id;
    else if (this.winnerIndex == 2)
      this.winnerId = "0";
    console.log("Winner Id:" + this.winnerId);
    this.addResultToDB();
    this.dialogRef.close(this.winnerId);
  }

  close() {
    this.dialogRef.close(0);
  }

  addResultToDB() {

    let teamOneName: string = this.teamsToAssign[0].team_name;
    let teamTwoName: string = this.teamsToAssign[1].team_name;
    let teamOneId: string = this.teamsToAssign[0]._id;
    let teamTwoId: string = this.teamsToAssign[1]._id;
    let teamOneResult: number = 0;
    let teamTwoResult: number = 0;


    if (this.winnerId === teamOneId) {
      teamOneResult = 1;
      this.looserId = teamTwoId;

    }
    else if (this.winnerId === teamTwoId) {
      teamTwoResult = 1;
      this.looserId = teamOneId;
    }

    let matchResult = {
      [teamOneName]: teamOneId,
      [teamTwoName]: teamTwoId,
      [teamOneId]: teamOneResult,
      [teamTwoId]: teamTwoResult,
      "teamOne": teamOneId,
      "teamTwo": teamTwoId,
      "winnerId": this.winnerId,
      "looserId": this.looserId

    }

    this.teamService.addMatchResult(matchResult).subscribe(
      (data) => {
        console.log('Result from addMatchResult POST', data);
        this.dialogRef.close(this.winnerId);
      }
    );
  }


}
