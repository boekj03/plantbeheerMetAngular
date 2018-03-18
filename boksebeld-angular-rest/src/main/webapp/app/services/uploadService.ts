import {Observable} from 'rxjs/Observable';
import {Plant} from '../model/plant';
import {Http, RequestOptions} from '@angular/http';



import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class UploadService {

    url = 'rest/image';
  constructor( private httpGeenClient: Http) {}


  uploadFotoFile(file: File, id: number) {
    console.log('file is : ' + file);

    // const  headers =  {headers: new  Headers({ 'Content-Type': 'application/x-www-form-urlencoded'})};


    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    return this.httpGeenClient.post(this.url + '/jersey' ,    formData);
  }


}
