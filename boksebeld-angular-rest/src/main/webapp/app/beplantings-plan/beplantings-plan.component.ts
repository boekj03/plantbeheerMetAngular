import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlannenService} from "../services/plannenService";
import {Subscription} from "rxjs/Subscription";
import {BeplantingsPlan} from "../model/beplantingsPlan";
import {Plant} from "app/model/plant";
import {PlantPlaats} from "app/model/plantPlaats";

@Component({
  selector: 'app-beplantings-plan',
  templateUrl: './beplantings-plan.component.html'
})
export class BeplantingsPlanComponent implements OnInit {

  private sub: Subscription;
  id: string;
  onderhandenPlan: BeplantingsPlan;
  nieuwConstantString: string = 'nieuw';



  selectedPlant: Plant;
  displayDialog: boolean;

  constructor(private route: ActivatedRoute, private plannenService:PlannenService) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.id = params.id;

      });
    console.log("id is" + this.id);

    if (this.id ===this.nieuwConstantString ){
      let nieuwPlan: BeplantingsPlan = new BeplantingsPlan();

      this.onderhandenPlan = this.plannenService.saveBeplantingsPlan(nieuwPlan);

    }else {
      this.onderhandenPlan = this.plannenService.getBeplantingsPlan(this.id);
    }
  }

  selectPlant(plant: Plant) {
    this.selectedPlant = plant;
    this.displayDialog = true;
  }
  deletePlanPlaats(plaats: PlantPlaats) {
    var index = this.onderhandenPlan.plantPlaatsLijst.indexOf(plaats, 0);
    if (index > -1) {
      this.onderhandenPlan.plantPlaatsLijst.splice(index, 1);
     }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
