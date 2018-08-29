import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Plant, PlantLijstContainer} from '../model/plant';
import {PlantZoekItem} from '../model/plantZoekItem';
import {Observable} from 'rxjs/Observable';
import {PlantenMapper} from '../model/plantenMapper';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Http, RequestOptions} from '@angular/http';

@Injectable()
export class PlantenService {

  url = 'rest/planten';

  constructor(private http: HttpClient, private httpGeenClient: Http) {}

  getPlantenContainer(): Observable<Plant []> {

    return this.http.get<Plant []>(this.url);
  }

  private extractPlantlijst(response: Response): Plant[] {
    return PlantenMapper.getPlantenLijst(response);
   }


  getplant(id: string): Observable<Plant> {


    return this.http.get(this.url + '/' + id)
      .map(this.extractPlant);
  }



  getGezochtePlanten(plantZoekItem: PlantZoekItem ): Plant[] {

    const plantLijst: Plant[] = new Array();
    return plantLijst;
  }




  updatePlant(onderhandePlant: Plant): Observable<Plant> {
    const plant = JSON.stringify(onderhandePlant);
    const formdata: FormData = new FormData();
    formdata.append('plant' , plant);
   return this.http.put(this.url, formdata,
      {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')})
     .map(this.extractPlant);
  }

  private extractPlant(response: Response) {
    let plant: Plant;
    plant = PlantenMapper.getPlant(response);
    return plant;
  }


  saveNewPlant(onderhandePlant: Plant): Observable<Plant>  {
    const plant = JSON.stringify(onderhandePlant);
    const formdata: FormData = new FormData();
    formdata.append('plant' , plant);
    return this.http.post(this.url, formdata,
      {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')})
      .map(this.extractPlant);
  }


 deletePlant(onderhandePlant: Plant) {
    const id =  '' + onderhandePlant.id;


   return this.http.delete( this.url + '/' + id);
 }

  copyPlant(onderhandePlant: Plant) {
    const id =  '' + onderhandePlant.id;
    return this.http.get( this.url + '/copyplant/' + id);
  }

  uploadFoto(file: String, id: number) {
    console.log(file);

    file = file.replace(/^data:image\/png;base64,/, '');
   const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    return this.http.post(this.url + '/jersey' ,      formData,
 {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')});
  }

}
