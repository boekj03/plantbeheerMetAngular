import {Plant, PlantLijstContainer} from './plant';
import {forEach} from '@angular/router/src/utils/collection';

export class PlantenMapper {

  static getPlantenLijst(jsonObject: any): PlantLijstContainer {
    const plantLijstContainer: PlantLijstContainer = new PlantLijstContainer();


    const anyArray: any[] =  jsonObject.plantLijst;

   for (const item of anyArray) {
      const plant = this.mapPlantDtoToPlant(item);

      plantLijstContainer.plantLijst.push(plant);
    }

    return plantLijstContainer;
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

    return plant;
  }

  static getPlant(jsonObject: any): Plant {

    const plantDTO = jsonObject;
    const plant = this.mapPlantDtoToPlant(plantDTO);
    return plant;
  }

}
