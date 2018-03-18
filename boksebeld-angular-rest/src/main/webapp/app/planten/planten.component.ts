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
  teTonenPlantLijst: Plant[] = new Array();

  keuzekleuren: SelectItem[] = kleurenConstantsFilter;
  hoogteLijst: SelectItem[] = hoogteConstantsFiltering;
  bladhoudendLijst: SelectItem[] = bladhoudendConstantsFilter;

  constructor(private plantenService: PlantenService) {console.log('CCCCCCC')}

  ngOnInit() {
    console.log('WWWWWWW')
    this.getPlanten();
  }


  private getPlanten() {
    this.plantenService.getPlantenContainer().subscribe(
      plantArray => {
        this.teTonenPlantLijst = plantArray;
      });
  }

  deletePlant(plant: Plant) {
    this.plantenService.deletePlant(plant).subscribe(
      deletplant => this.getPlanten()
    );
  }

  copyPlant(plant: Plant) {
    this.plantenService.copyPlant(plant).subscribe(
      copyplant => this.getPlanten()
    );
  }
}
