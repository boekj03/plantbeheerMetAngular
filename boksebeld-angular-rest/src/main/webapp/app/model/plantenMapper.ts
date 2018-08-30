import {Plant, PlantLijstContainer} from './plant';
import {forEach} from '@angular/router/src/utils/collection';
import {BeplantingsPlan} from './beplantingsPlan';
import {plantsoortConstants} from './enumConstants';
import {PlantPlaats} from './plantPlaats';

export class PlantenMapper {

  static getPlantenLijst(jsonObject: any): Plant[] {
    const plantlijst: Plant[] = new Array();


    const anyArray: any[] = jsonObject;

   for (const item of anyArray) {
      const plant = this.mapPlantDtoToPlant(item);

     plantlijst.push(plant);
    }

    return plantlijst;
  }

  private static mapPlantDtoToPlant(item: any) {

    const plant: Plant = new Plant();
    plant.id = item.id;
    plant.nederlandseNaam = item.nederlandseNaam;
    plant.aantalPerMeter = item.aantalPerMeter;
    plant.beschrijving = item.beschrijving;
    plant.botanischeNaam = item.botanischeNaam;
    plant.code = item.code;
    plant.leverancier = item.leverancier;
    plant.handelsmaat = item.handelsmaat;
    plant.inkoopprijs = item.inkoopprijs;
    plant.hoogte = item.hoogte;
    plant.bladhoudend = item.bladhoudend;
    plant.bloeitijdLijst = item.bloeitijdLijst;
    plant.grondsoort = item.grondsoort;
    plant.kleur = item.kleur;
    plant.plantsoort = item.plantsoort;
    plant.lichtbehoefte = item.lichtbehoefte;
    plant.base64Image = item.base64Image;
    plant.image = item.image;

      for (let i = 0; i < plant.bloeitijdLijst.length; i++) {
        if ( plant.bloeitijdLijst[i] === 'maart') {
          PlantenMapper.voegBloeitijdToe(plant, 'mrt' + ' ');
       } else {
          PlantenMapper.voegBloeitijdToe(plant,  plant.bloeitijdLijst[i].substr(0, 3) + ' ');
        }
      }
    return plant;
  }

  private static voegBloeitijdToe(plant: Plant, afkortingMaand: string) {
      if (plant.bloeitijdString) {
        plant.bloeitijdString = plant.bloeitijdString + afkortingMaand;
      } else {
        plant.bloeitijdString =  afkortingMaand;
      }
  }

  static getPlant(jsonObject: any): Plant {

    const plantDTO = jsonObject;
    const plant = this.mapPlantDtoToPlant(plantDTO);
    return plant;
  }

  static getBeplanginsPlan(jsonObject: any): BeplantingsPlan {

    const plan: BeplantingsPlan  = new BeplantingsPlan();
    plan.id = jsonObject.id;
    plan.naam = jsonObject.naam;
    plan.plantPlaatsLijst = this.mapPlantPlaatsLijst(jsonObject);
    return plan;
  }

  static mapPlantPlaatsLijst(jsonObject: any): PlantPlaats[] {
    const jsonPlantPlaatsLijst: any[] =  jsonObject.plantPlaatsLijst;
    const plantPlaatslijst: PlantPlaats[] = new Array();
    for (const jsonPlantplaatsItem of jsonPlantPlaatsLijst) {
      const plantPlaats = this.mapPlantPlaats(jsonPlantplaatsItem);
      plantPlaatslijst.push(plantPlaats);
    }
    return plantPlaatslijst;
  }
  private static mapPlantPlaats(item: any):  PlantPlaats {
      const plantPlaats: PlantPlaats = new PlantPlaats();
      plantPlaats.id = item.id;
      plantPlaats.naam = item.naam;
      plantPlaats.vierkanteMeters = item.vierkanteMeters;
      if (item.plant) {
        const plant = this.mapPlantDtoToPlant(item.plant);
        plantPlaats.plant = plant;
     }
     return plantPlaats;

  }

  public static stripBeplantingsPlanVoorOpsturenNaarServer(plan: BeplantingsPlan): BeplantingsPlan{

    for (const plantPlaats of plan.plantPlaatsLijst) {
      const plantMetAlleenId = new Plant();
      plantMetAlleenId.id = plantPlaats.plant.id;
      plantPlaats.plant = plantMetAlleenId;
    }
    return plan;
  }



  }
