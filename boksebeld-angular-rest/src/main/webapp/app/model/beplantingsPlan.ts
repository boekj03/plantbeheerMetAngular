import {PlantPlaats} from "./plantPlaats";

export class BeplantingsPlan {
  id: number;
  naam: string;
  datum: Date;
  plantPlaatsLijst: PlantPlaats[] = new Array();
}
