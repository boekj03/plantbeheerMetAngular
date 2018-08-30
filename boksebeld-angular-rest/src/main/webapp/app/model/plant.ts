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
    bloeitijdString: string;
    grondsoort: string;
    kleur: string;
    plantsoort: string;
    lichtbehoefte: string;
    image: any[] = new Array();
    base64Image: string;
    newbase64Image: string;


}

export class PlantLijstContainer {
  plantLijst: Plant[]  = new Array();
}
