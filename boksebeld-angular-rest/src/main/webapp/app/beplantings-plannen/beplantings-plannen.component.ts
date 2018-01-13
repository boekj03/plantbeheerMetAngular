import { Component, OnInit } from '@angular/core';
import {PlannenService} from "../services/plannenService";
import {BeplantingsPlan} from "../model/beplantingsPlan";

@Component({
  selector: 'app-beplantings-plannen',
  templateUrl: './beplantings-plannen.component.html'
})
export class BeplantingsPlannenComponent implements OnInit {

  teTonenPlannenLijst : BeplantingsPlan[] = new Array();

  constructor(private plannenService:PlannenService) { }

  ngOnInit() {
    this.teTonenPlannenLijst = this.plannenService.getBeplantingsPlannen();
  }

  copyBeplantingsplan(plan: BeplantingsPlan){
    let nieuwPlan : BeplantingsPlan =  this.plannenService.createCopy(plan);
    this.teTonenPlannenLijst.unshift(nieuwPlan);
  }

  deleteBeplantingsplan(plan: BeplantingsPlan) {
    var index = this.teTonenPlannenLijst.indexOf(plan, 0);
    if (index > -1) {
      this.teTonenPlannenLijst.splice(index, 1);
    }
  }
}
