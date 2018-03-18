import {forEach} from "@angular/router/src/utils/collection";

export class Plant {
    id: number;
    nederlandseNaam: string;
    aantalPerMeter: number;
    beschrijving: string;
    botanischeNaam: string;
    code: string;
    leverancier: string;
    handelsmaat: string;
    inkoopprijs: number;
    hoogte: string;
    bladhoudend: string;
    bloeitijdLijst:  string[] = new Array();
    grondsoort: string;
    kleur: string;
    plantsoort: string;
    lichtbehoefte: string;
    image: any[] = new Array();
    base64Image: string;
    newbase64Image: string;

    bloeiTijdString(): string{
      let retVal: string = '';
      for (var i = 0; i < this.bloeitijdLijst.length; i++) {
        if(this.bloeitijdLijst[i] === 'maart'){
          retVal = retVal + 'mrt' + ' ';
        } else {
          retVal = retVal + this.bloeitijdLijst[i].substr(0, 3) + ' ';
        }
      }
      return retVal;
    }
}

export class PlantLijstContainer {
  plantLijst: Plant[]  = new Array();
}
