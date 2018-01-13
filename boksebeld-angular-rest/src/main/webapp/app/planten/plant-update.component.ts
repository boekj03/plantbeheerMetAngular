import { Component, OnInit } from '@angular/core';
import {PlantenService} from "../services/plantenService";
import {ActivatedRoute} from "@angular/router";
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

@Component({
  selector: 'app-plant-update',
  templateUrl: './plant-update.component.html'
})
export class PlantUpdateComponent implements OnInit {
  id: string;
  onderhandePlant: Plant = new Plant();
  private sub: Subscription;
  keuzekleuren: SelectItem[] = kleurenConstants;
  hoogteLijst: SelectItem[] = hoogteConstants;
  bladhoudendLijst: SelectItem[] = bladhoudendConstants;
  grondsoortLijst: SelectItem[] = grondsoortConstants;
  bloeitijdLijst: SelectItem[] = bloeitijdConstants;
  plantsoortLijst: SelectItem[] = plantsoortConstants;


  msgs: Message[];

  uploadedFiles: any[] = [];

  constructor(private route: ActivatedRoute, private plantenService: PlantenService) {

  }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.id = params.id;
        this.plantenService.getplant(this.id).subscribe(
          onderhandePlant => {this.onderhandePlant = onderhandePlant;
          });

      });

  }

  myUploader(event) {
    console.log("in de onUpload");
    const file: File = event.files[0];
    this.readThis(file);

   }

  updatePlant() {
    this.plantenService.savePlant(this.onderhandePlant).subscribe();
  }

  readThis(file: File): void {
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.onderhandePlant.newbase64Image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
