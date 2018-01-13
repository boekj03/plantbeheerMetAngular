import {BeplantingsPlan} from "../model/beplantingsPlan";
import {Injectable} from "@angular/core";
import {Plant} from "../model/plant";
import {PlantPlaats} from "../model/plantPlaats";
@Injectable()
export class PlannenService{

  getBeplantingsPlan(id: string):BeplantingsPlan{
    let plan : BeplantingsPlan = new BeplantingsPlan();
    plan.naam = "eerste plan";
    plan.datum =  new Date("2015-03-25");

    let plaats: PlantPlaats  =  new PlantPlaats();
    plaats.naam = "plaatsnaam";
    plaats.vierkanteMeters= 12;
    plaats.plant = this.createPlant("plant1 bij plan", "botnaampje", "10 cm", "bes" );

    let plaats2: PlantPlaats  =  new PlantPlaats();
    plaats2.naam = "plaatsnaam2";
    plaats2.vierkanteMeters= 12;
    plaats2.plant = this.createPlant("plant2 bij plan", "botnaampje", "10 cm", "bes" );

    plan.plantPlaatsLijst.push(plaats);
    plan.plantPlaatsLijst.push(plaats2);

    return plan;
  }

  getBeplantingsPlannen(): BeplantingsPlan[] {
    let beplantinsPlanLijst: BeplantingsPlan[] =  new Array();
    let plan1 : BeplantingsPlan = new BeplantingsPlan();
    plan1.naam = "eerste plan";
    plan1.id = 1;
    plan1.datum = new Date("2015-03-25");
    beplantinsPlanLijst.push(plan1);

    let plan2 : BeplantingsPlan = new BeplantingsPlan();
    plan2.naam = "tweede plan";
    plan2.id = 2;
    plan2.datum = new Date("2015-03-25");
    beplantinsPlanLijst.push(plan2);

    let plan3 : BeplantingsPlan = new BeplantingsPlan();
    plan3.naam = "derde plan";
    plan3.id = 3;
    plan3.datum = new Date("2015-03-25");
    beplantinsPlanLijst.push(plan3);

    let plan4 : BeplantingsPlan = new BeplantingsPlan();
    plan4.naam = "vierde plan met wat langere naam";
    plan4.id = 4;
    plan4.datum = new Date("2015-03-25");
    beplantinsPlanLijst.push(plan4);
    return beplantinsPlanLijst;

  }

  updateBeplantingsPlan(beplantingsPlan:  BeplantingsPlan){
  }

  deleteBeplantingsPlan(id: string){

  }
  saveBeplantingsPlan (beplantingsPlan:  BeplantingsPlan): BeplantingsPlan {
    let nieuwPlan: BeplantingsPlan = new BeplantingsPlan();
    return nieuwPlan;
  }

  createCopy(beplantingsPlan:  BeplantingsPlan){
    let plan : BeplantingsPlan = new BeplantingsPlan();
    plan.naam = "dit is een kopie";
    plan.id = 4;
    plan.datum = new Date("2015-03-25");

    return plan;
  }


  createPlant(naam: string, botnaam: string, hoogte: string, beschrijving: string):Plant{
    let plant = new Plant();
    plant.id = 13;
    plant.botanischeNaam = botnaam;
    plant.nederlandseNaam = naam;
    plant.hoogte = hoogte;
    plant.beschrijving = beschrijving;
    plant.bladhoudend = 'bladverliezend';
    plant.bloeitijdLijst.push('januari', 'februari', 'maart');
    return plant;
  }
}
