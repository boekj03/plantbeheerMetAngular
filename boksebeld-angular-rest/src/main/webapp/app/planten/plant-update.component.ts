import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlantenService} from "../services/plantenService";
import {ActivatedRoute, Router} from '@angular/router';
import {Plant} from "../model/plant";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Subscription} from "rxjs/Subscription";
import {SelectItem} from "primeng/components/common/selectitem";
import {
  bladhoudendConstants, grondsoortConstants, hoogteConstants, kleurenConstants, bloeitijdConstants,
  plantsoortConstants
} from "../model/enumConstants";
import {Message} from 'primeng/primeng';
import {UploadService} from '../services/uploadService';

@Component({
  selector: 'app-plant-update',
  templateUrl: './plant-update.component.html'
})
export class PlantUpdateComponent implements OnInit, OnDestroy{
  id: string;
  onderhandePlant: Plant = new Plant();
  private sub: Subscription;
  keuzekleuren: SelectItem[] = kleurenConstants;
  hoogteLijst: SelectItem[] = hoogteConstants;
  bladhoudendLijst: SelectItem[] = bladhoudendConstants;
  grondsoortLijst: SelectItem[] = grondsoortConstants;
  bloeitijdLijst: SelectItem[] = bloeitijdConstants;
  plantsoortLijst: SelectItem[] = plantsoortConstants;

  img: string;
  imgageFile: any;
  msgs: Message[];

  uploadedFiles: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router,  private plantenService: PlantenService, private uploadService: UploadService) {

  }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.id = params.id;
        if (this.id) {
          this.getOnderhandenPlant();
        } else {
         this.onderhandePlant = new Plant();
        }
      });

  }

  private getOnderhandenPlant() {
      this.plantenService.getplant(this.id).subscribe(
      onderhandePlant => {
        this.onderhandePlant = onderhandePlant;
        console.log('DDDDIT IS HET ID NA bij get onderhande plant ', this.id);
      });



  }



  updatePlant() {
    if (this.id) {
      this.plantenService.updatePlant(this.onderhandePlant).subscribe(
        update => {
          this.getOnderhandenPlant();
          this.router.navigate(['/catalogus']);
        }
      );
    } else {
      this.plantenService.saveNewPlant(this.onderhandePlant).subscribe(
         onderhandePlant => {
            this.onderhandePlant = onderhandePlant;
           this.router.navigate(['/catalogus']);
         });
    }

  }

  myUploader(event) {
    console.log('in de onUpload');
    const file: File = event.files[0];


    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.imgageFile = myReader.result;
    }
    myReader.readAsDataURL(file);
    this.uploadService.uploadFotoFile(file, this.onderhandePlant.id).subscribe();

   // this.uploadService.uploadFotoAsString(file, this.onderhandePlant.id).subscribe(   );
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
