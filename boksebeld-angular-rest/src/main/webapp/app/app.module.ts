import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MainComponent } from './main-component/main.component';
import {AppRoutes} from "./app.routes"
import {RouterModule} from "@angular/router";
import {
  AccordionModule, ButtonModule, CalendarModule, DataGridModule, DataTableModule, DialogModule, DropdownModule,
  FileUploadModule, ListboxModule,
  MultiSelectModule,
  PanelModule
} from 'primeng/primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PlantenComponent } from './planten/planten.component';
import {PlantenService} from "./services/plantenService";
import { PlantUpdateComponent } from './planten/plant-update.component';
import { PlantenSelectieComponent } from './planten-selectie/planten-selectie.component';
import { BeplantingsPlannenComponent } from './beplantings-plannen/beplantings-plannen.component';
import {PlannenService} from "./services/plannenService";
import { BeplantingsPlanComponent } from './beplantings-plan/beplantings-plan.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MainComponent,
    PlantenComponent,
    PlantUpdateComponent,
    PlantenSelectieComponent,
    BeplantingsPlannenComponent,
    BeplantingsPlanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, AccordionModule,  BrowserAnimationsModule,
    // primeNg
    ButtonModule, DataGridModule, DataTableModule, PanelModule, DialogModule, DropdownModule, FileUploadModule, MultiSelectModule,
    CalendarModule, ListboxModule,

    RouterModule.forRoot(AppRoutes)
  ],
  providers: [PlantenService, PlannenService],
  bootstrap: [MainComponent]
})
export class AppModule { }
