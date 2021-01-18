import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../model/team';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { AssignResultDialogComponent } from '../assign-result-dialog/assign-result-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedTeams: Set<string> = new Set<string>();
  teams: Team[] = [];
  errorMessage: string = "";
  config: any;
  isLoaded: boolean = false;
  sortByFactor: string = "";
  searchTerm: string = "";

  constructor(private teamService: TeamService, private dialog: MatDialog) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.teams.length
    };

    if (this.teams) {
      this.isLoaded = true;
    }
  }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe(
      teams => {
        this.teams = teams;
        this.getTeamsSortedByScore();
      },
      error => this.errorMessage = <any>error);
  }

  getTeamsSortedByScore() {
    this.teams.sort(function (a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
  }

  getTeamsSortedByName() {
    this.teams.sort(function (a, b) {
      if (a.team_name < b.team_name) {
        return -1;
      }
      if (b.team_name < a.team_name) {
        return 1;
      }
      return 0;
    });

  }

  onTeamClick(id: string) {
    if (this.selectedTeams.has(id)) {
      this.selectedTeams.delete(id);
    }
    else {
      if (this.selectedTeams.size < 2) {
        this.selectedTeams.add(id);
      }
    }

    if (this.selectedTeams.size == 2) {
      this.OpenAssignResultDialog();
    }

  }


  isTeamSelected(id: string) {
    return this.selectedTeams.has(id);
  }

  getSelectedTeams() {
    return this.teams.filter(t => this.selectedTeams.has(t._id));
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }


  OpenAssignResultDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    dialogConfig.data = {
      teamsToAssign: this.getSelectedTeams()
    }

    this.dialog.open(AssignResultDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(AssignResultDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Winner from Assign dialog is :", data.toString())
        this.selectedTeams.clear();
        this.getTeams();
        this.dialog.closeAll();
      }
    );
  }



  handleSort(eventValue: any) {
    if (this.sortByFactor === "None") {
      this.getTeamsSortedByScore();
    }
    else if (this.sortByFactor === "Score") {
      this.getTeamsSortedByScore();
    }
    else if (this.sortByFactor === "Name") {
      this.getTeamsSortedByName();
    }
  }

}


