import { Component, OnInit } from '@angular/core';
import {PlantenService} from "../services/plantenService";
import {Plant, PlantLijstContainer} from '../model/plant';

import {SelectItem} from "primeng/components/common/selectitem";
import {
  bladhoudendConstants, bladhoudendConstantsFilter, bloeitijdConstants, bloeitijdConstantsFilter, hoogteConstants, hoogteConstantsFiltering,
  kleurenConstants, kleurenConstantsFilter
} from '../model/enumConstants';
import {PlantenMapper} from '../model/plantenMapper';


@Component({
  selector: 'app-planten',
  templateUrl: './planten.component.html',
  styleUrls: ['./planten.component.css']
})
export class PlantenComponent implements OnInit {


  allePlanten: Plant[] = new Array();
  teTonenPlantLijst: Plant[] = new Array();

  keuzekleuren: SelectItem[] = kleurenConstantsFilter;
  hoogteLijst: SelectItem[] = hoogteConstantsFiltering;
  bladhoudendLijst: SelectItem[] = bladhoudendConstantsFilter;
  bloeitijdLijst: SelectItem[] = bloeitijdConstantsFilter;
  private _beschrijvingSearch: string;

  constructor(private plantenService: PlantenService) {console.log('CCCCCCC')}

  ngOnInit() {
    console.log('WWWWWWW')
    this.getPlanten();
  }

  get beschrijvingSearch() {
    return this._beschrijvingSearch;
  }

  set beschrijvingSearch(value) {

    this._beschrijvingSearch = value;
    this.teTonenPlantLijst = this.allePlanten.filter(plant => plant.beschrijving && plant.beschrijving.toLocaleLowerCase().indexOf(this._beschrijvingSearch.toLocaleLowerCase()) >= 0);
  }

  private getPlanten() {
    this.plantenService.getPlantenContainer().subscribe(
      plantArray => {
        this.allePlanten = PlantenMapper.getPlantenLijst(plantArray);
        this.teTonenPlantLijst = this.allePlanten;
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
