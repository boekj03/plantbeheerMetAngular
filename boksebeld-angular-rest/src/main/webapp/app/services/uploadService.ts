import {Observable} from 'rxjs/Observable';
import {Plant} from '../model/plant';
import {Http, RequestOptions} from '@angular/http';



import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlantenMapper} from '../model/plantenMapper';

@Injectable()
export class UploadService {

    url = 'rest/image';
  constructor( private http: HttpClient) {}


  uploadFotoFile(image: string, id: number): Observable<Plant> {
    console.log('file die verstuurd wordt bij upload is : ' + image);

    // const  headers =  {headers: new  Headers({ 'Content-Type': 'application/x-www-form-urlencoded'})};

    image = 'BEGIN_ID' + id + 'BEGINGIMAGEFILE' + image + 'EINDIMAGEFILE';

    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('id', id);


    return this.http.post(this.url + '/upload' ,    formData).map(this.extractPlant);
  }

  private extractPlant(response: Response) {
    const plantDTO: any = response;
    const plant: Plant = new Plant();
     plant.base64Image = plantDTO.base64Image;
    return plant;
  }
}
