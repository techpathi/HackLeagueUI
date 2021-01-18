import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from './team.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatRadioModule } from '@angular/material/radio';
import { AssignResultDialogComponent } from './assign-result-dialog/assign-result-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddTeamComponent,
    AssignResultDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    NgxPaginationModule,
    MatSelectModule,
    Ng2SearchPipeModule
  ],
  providers: [TeamService],
  bootstrap: [AppComponent],
  entryComponents: [AssignResultDialogComponent]
})
export class AppModule { }
