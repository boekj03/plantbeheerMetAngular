import {BeplantingsPlan} from "../model/beplantingsPlan";
import {Injectable} from "@angular/core";
import {Plant} from "../model/plant";
import {PlantPlaats} from "../model/plantPlaats";
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlantenMapper} from '../model/plantenMapper';
@Injectable()
export class PlannenService {
  url = 'rest/plannen';

  constructor(private http: HttpClient) {}

  getPlannenLijst(): Observable<BeplantingsPlan []> {
   return this.http.get<BeplantingsPlan []>(this.url);
  }


  getplan(id: string): Observable<BeplantingsPlan> {


    return this.http.get(this.url + '/' + id)
      .map(this.extractBeplantingsPlan);
  }

  private extractBeplantingsPlan(response: Response) {

    let beplantingsPlan: BeplantingsPlan;
    beplantingsPlan = PlantenMapper.getBeplanginsPlan(response);
    return beplantingsPlan;
  }

  deletePlan(onderhandePlan: BeplantingsPlan) {
    const id =  '' + onderhandePlan.id;
   return this.http.delete( this.url + '/' + id);
  }

  copyPlan(onderhandePlan: BeplantingsPlan) {

    return this.http.post(this.url + '/copyplan',
      onderhandePlan, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  savePlan(onderhandePlan: BeplantingsPlan): Observable<BeplantingsPlan> {
    // hier even plant leeg maken uitgezonderd zijn id
     const teSturenPlan =  PlantenMapper.stripBeplantingsPlanVoorOpsturenNaarServer(onderhandePlan);

    return this.http.post(this.url, teSturenPlan, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .map(this.extractBeplantingsPlan);
  }

  deletePlantPlaats(id: number) {
    return this.http.delete( this.url + '/deleteplaats/' + id);
  }
}
