import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../model/team';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  constructor(private teamService: TeamService) { }

  teamName: string = "";

  teamNametoDisplay: string = "";

  isteamAdded: boolean = false;

  errorMessage: string = "";

  ngOnInit(): void {
  }

  addTeam(): void {

    if (this.teamName === "") {
      this.errorMessage = "Team name cannot be blank!";
    }
    else {
      let newTeam: Team = {
        _id: "",
        team_name: this.teamName,
        wins: 0,
        losses: 0,
        ties: 0,
        score: 0
      }

      this.teamService.addTeam(newTeam).subscribe();
      this.isteamAdded = true;
      this.teamNametoDisplay = this.teamName;
      this.teamName = '';
    }
  }


}
