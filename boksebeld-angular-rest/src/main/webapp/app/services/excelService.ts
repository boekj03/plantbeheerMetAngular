import {BeplantingsPlan} from "../model/beplantingsPlan";
import {Injectable} from "@angular/core";
import {Plant} from "../model/plant";
import {PlantPlaats} from "../model/plantPlaats";
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlantenMapper} from '../model/plantenMapper';
import {Http, ResponseContentType} from '@angular/http';
@Injectable()
export class ExcelService {
  url = 'rest/excel';

  constructor(private http: Http) {}



  excelPlan(id: number) {
      return this.http.get(this.url + '/' + id,  { responseType: ResponseContentType.Blob});
  }


}
