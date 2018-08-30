import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlannenService} from "../services/plannenService";
import {Subscription} from "rxjs/Subscription";
import {BeplantingsPlan} from "../model/beplantingsPlan";
import {Plant} from "app/model/plant";
import {PlantPlaats} from "app/model/plantPlaats";
import {SelectItem} from 'primeng/components/common/selectitem';
import {bladhoudendConstantsFilter, hoogteConstantsFiltering, kleurenConstantsFilter} from '../model/enumConstants';
import {PlantenService} from '../services/plantenService';
import {PlantenMapper} from '../model/plantenMapper';

@Component({
  selector: 'app-beplantings-plan',
  templateUrl: './beplantings-plan.component.html',
  styleUrls: ['./beplantings-plan.component.css']
})
export class BeplantingsPlanComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  id: string;
  onderhandenPlan: BeplantingsPlan;
  allePlantLijst: Plant[] = new Array();
  keuzekleuren: SelectItem[] = kleurenConstantsFilter;
  hoogteLijst: SelectItem[] = hoogteConstantsFiltering;
  bladhoudendLijst: SelectItem[] = bladhoudendConstantsFilter;

  toevoegswitch: boolean;
  constructor(private route: ActivatedRoute, private plannenService: PlannenService, private plantenService: PlantenService ) { }


  public selectplant(selectedPlant: Plant) {
    const plantPlaats: PlantPlaats = new PlantPlaats();
    plantPlaats.naam = selectedPlant.code;
    plantPlaats.plant = selectedPlant;
    this.onderhandenPlan.plantPlaatsLijst.push(plantPlaats );
  }


  public verwijderPlantplaats(plantPlaats: PlantPlaats) {
    this.onderhandenPlan.plantPlaatsLijst.splice(this.onderhandenPlan.plantPlaatsLijst.indexOf(plantPlaats), 1);
    if (plantPlaats.id) {
      this.plannenService.deletePlantPlaats(plantPlaats.id).subscribe();
    }
  }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.id = params.id;
        if (this.id) {
           this.getOnderhandenBeplantingsPlant();
        } else {
          this.onderhandenPlan = new BeplantingsPlan();
        }
        this.getPlanten();
      });
  }

  private getPlanten() {
    this.plantenService.getPlantenContainer().subscribe(
      allePlantLijst => {
        this.allePlantLijst = PlantenMapper.getPlantenLijst(allePlantLijst);
      });
  }

  private getOnderhandenBeplantingsPlant() {
    this.plannenService.getplan(this.id).subscribe(
      onderhandenPlan => {
        this.onderhandenPlan = onderhandenPlan;
       });
  }


  public saveBeplantingsPlan() {
    this.plannenService.savePlan(this.onderhandenPlan).subscribe(
      onderhandenPlan => {
        this.onderhandenPlan = onderhandenPlan;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
