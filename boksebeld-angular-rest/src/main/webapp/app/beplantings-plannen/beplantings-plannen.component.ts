import { Component, OnInit } from '@angular/core';
import {PlannenService} from "../services/plannenService";
import {BeplantingsPlan} from "../model/beplantingsPlan";
import {Plant} from '../model/plant';
import {ExcelService} from '../services/excelService';
import 'rxjs/Rx' ;
import {WindowRefService} from '../services/windowRef';

@Component({
  selector: 'app-beplantings-plannen',
  templateUrl: './beplantings-plannen.component.html'
})
export class BeplantingsPlannenComponent implements OnInit {

  teTonenPlannenLijst: BeplantingsPlan[] = new Array();

  constructor(private plannenService: PlannenService, private excelService: ExcelService, private windowService: WindowRefService) { }

  ngOnInit() {
    this.getPlannen();
  }

  private getPlannen() {
    this.plannenService.getPlannenLijst().subscribe(
      planArray => {
        this.teTonenPlannenLijst = planArray;
      });
  }
  deletePlan(plan: BeplantingsPlan) {
    this.plannenService.deletePlan(plan).subscribe(
      deletplant => this.getPlannen()
    );

  }

  copyPlan(plan: BeplantingsPlan) {
    this.plannenService.copyPlan(plan).subscribe(
      copyplan => this.getPlannen()
    );
  }


  excelPlan (plan: BeplantingsPlan) {

    const naam = plan.naam;
      const result = this.excelService.excelPlan(plan.id);
      result.subscribe(
        success => {
          const blob = new Blob([success.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = naam;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
      );
    }


}
