import { Component, OnInit } from '@angular/core';
import {PlantenService} from "app/services/plantenService";
import {PlantZoekItem} from "../model/plantZoekItem";
import {SelectItem} from "primeng/primeng";
import {
  bladhoudendConstants, bloeitijdConstants, grondsoortConstants, hoogteConstants,
  kleurenConstants, lichtbehoefteConstants, plantsoortConstants
} from "../model/enumConstants";
import {Plant} from "../model/plant";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {BeplantingsPlan} from "../model/beplantingsPlan";
import {PlannenService} from "../services/plannenService";

@Component({
  selector: 'app-planten-selectie',
  templateUrl: './planten-selectie.component.html'
})
export class PlantenSelectieComponent implements OnInit {

  plantZoekItem: PlantZoekItem;
  teTonenPlantLijst : Plant[] = new Array();
  selectedPlant: Plant;



  id: string;
  onderhandenPlan: BeplantingsPlan;
  private sub: Subscription;

  displayDialog: boolean;
  kleurLijst : SelectItem[] = kleurenConstants;
  hoogteLijst : SelectItem[] = hoogteConstants;
  bladhoudendLijst :SelectItem[] = bladhoudendConstants;
  grondsoortLijst :SelectItem[] = grondsoortConstants;
  bloeitijdLijst :SelectItem[] = bloeitijdConstants;
  plantsoortLijst :SelectItem[] = plantsoortConstants;
  lichtbehoefteLijst :SelectItem[] = lichtbehoefteConstants;

  constructor( private route: ActivatedRoute, private plannenService : PlannenService,  private plantenService : PlantenService) { }


  ngOnInit() {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.id = params.id;

      });
    console.log("id is" + this.id);

    this.onderhandenPlan = this.plannenService.getBeplantingsPlan(this.id);


  }

  zoekPlanten(event){

  }
  initieelZoeken(event){

  }

  selectPlant(plant: Plant) {
    this.selectedPlant = plant;
    this.displayDialog = true;
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

