import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Plant, PlantLijstContainer} from '../model/plant';
import {PlantZoekItem} from '../model/plantZoekItem';
import {Observable} from 'rxjs/Observable';
import {PlantenMapper} from '../model/plantenMapper';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RequestOptions} from '@angular/http';

@Injectable()
export class PlantenService {



  constructor(private http: HttpClient) {}

  getPlantenContainer(): Observable<PlantLijstContainer> {

    return this.http.get('http://localhost:8080/boksebeld-angular-rest-1.0.0-SNAPSHOT/rest/allePlanten')
      .map(this.extractPlantContainer);
  }

  private extractPlantContainer(response: Response) {
   let plantLijstContainer: PlantLijstContainer;
    plantLijstContainer = PlantenMapper.getPlantenLijst(response);
   return plantLijstContainer;
  }


  getplant(id: string): Observable<Plant> {
    console.log('getplant wordt aangeroepen met id ' + id);
    const params = new HttpParams().set('id', id);

    return this.http.get('http://localhost:8080/boksebeld-angular-rest-1.0.0-SNAPSHOT/rest/plant', { params: params })
      .map(this.extractPlant);
  }

  private extractPlant(response: Response) {
    let plant: Plant;
    plant = PlantenMapper.getPlant(response);
    return plant;
  }


  getGezochtePlanten(plantZoekItem: PlantZoekItem ): Plant[] {

    const plantLijst: Plant[] = new Array();
    return plantLijst;
  }





 savePlant(onderhandePlant: Plant) {

   const plant = JSON.stringify(onderhandePlant);
   const oldimage = JSON.stringify(onderhandePlant.base64Image);
   const newimage = JSON.stringify(onderhandePlant.newbase64Image);

   const formdata: FormData = new FormData();
   formdata.append('plant' , plant);
   formdata.append('oldimage' , oldimage);
   formdata.append('newimage' , newimage);

   const headers = new Headers({ 'Content-Type': 'application/json' });
   return this.http.post('http://localhost:8080/boksebeld-angular-rest-1.0.0-SNAPSHOT/rest/saveplant', formdata,
      {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')});
     // {headers: new HttpHeaders().set('Content-Type', 'application/json')});
 }
}
