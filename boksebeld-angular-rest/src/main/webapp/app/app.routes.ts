import {Routes} from "@angular/router";

import {PlantenComponent} from "./planten/planten.component";
import {PlantUpdateComponent} from "./planten/plant-update.component";

import {BeplantingsPlannenComponent} from "./beplantings-plannen/beplantings-plannen.component";
import {BeplantingsPlanComponent} from "./beplantings-plan/beplantings-plan.component";

export const AppRoutes: Routes = [

  {path: '', component: PlantenComponent},
  {path: 'catalogus', component: PlantenComponent},
  {path: 'plannen', component: BeplantingsPlannenComponent},
  {path: 'plant/:id', component: PlantUpdateComponent },
  {path: 'nieuwePlant', component: PlantUpdateComponent },
  {path: 'beplantingsplan/:id', component: BeplantingsPlanComponent },
  {path: 'nieuwBeplantingsplan', component: BeplantingsPlanComponent }
];

