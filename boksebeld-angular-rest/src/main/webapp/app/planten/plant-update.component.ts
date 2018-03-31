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


  oldImage: string;
  newImage: string;


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
        this.oldImage = onderhandePlant.base64Image;
       });



  }



  updatePlant() {
    if (this.id) {
      this.onderhandePlant.base64Image = this.oldImage;
      this.plantenService.updatePlant(this.onderhandePlant).subscribe(
        updatedPlant => {
          this.getOnderhandenPlant();
        }
      );
    } else {
      this.plantenService.saveNewPlant(this.onderhandePlant).subscribe(
         onderhandePlant => {
            this.onderhandePlant = onderhandePlant;
          // this.router.navigate(['/catalogus']);
         });
    }

  }

  bewaarFoto() {
    this.uploadService.uploadFotoFile(this.newImage, this.onderhandePlant.id).subscribe(
      plant => {
        this.oldImage = plant.base64Image;
      });
  }



  myUploader(event) {
    const file: File = event.files[0];


    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.newImage = myReader.result.split(',')[1];

    }
    myReader.readAsDataURL(file);

  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
