import { Component, OnInit } from '@angular/core';
import {PlantenService} from "../services/plantenService";
import {Plant, PlantLijstContainer} from '../model/plant';

import {SelectItem} from "primeng/components/common/selectitem";
import {
  bladhoudendConstants, bladhoudendConstantsFilter, bloeitijdConstants, hoogteConstants, hoogteConstantsFiltering,
  kleurenConstants, kleurenConstantsFilter
} from '../model/enumConstants';


@Component({
  selector: 'app-planten',
  templateUrl: './planten.component.html',
  styleUrls: ['./planten.component.css']
})
export class PlantenComponent implements OnInit {

  plantLijstContainer: PlantLijstContainer;
  plantLijst: Plant[] = new Array();
  teTonenPlantLijst: Plant[] = new Array();


  keuzekleuren: SelectItem[] = kleurenConstantsFilter;
  hoogteLijst: SelectItem[] = hoogteConstantsFiltering;
  bladhoudendLijst: SelectItem[] = bladhoudendConstantsFilter;

  filterPlant: Plant = new Plant();

  selectedPlant: Plant;
  displayDialog: boolean;

  constructor(private plantenService: PlantenService) { }

  ngOnInit() {

    this.plantenService.getPlantenContainer().subscribe(
      plantLijstContainer => {this.plantLijstContainer = plantLijstContainer;
      this.teTonenPlantLijst = this.plantLijstContainer.plantLijst;
      });
  }
  selectPlant(plant: Plant) {
    this.selectedPlant = plant;
    this.displayDialog = true;
  }
  onDialogHide() {
    this.selectedPlant = null;
  }

  filerResult(event){
    if (this.filterPlant.kleur) {
      this.teTonenPlantLijst = new Array();

      for (var i = 0; i < this.plantLijst.length; i++) {

        let huidigePlant: Plant = this.plantLijst[i];
        if (huidigePlant.kleur === this.filterPlant.kleur) {
          this.teTonenPlantLijst.push(huidigePlant);
        }
      }
    }
  }

  clearFilterResult(event){
    this.filterPlant= new Plant();
    this.teTonenPlantLijst =this.plantLijst;
  }
}
