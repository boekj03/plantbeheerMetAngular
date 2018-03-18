package nl.boksebeld.domein.service;

import java.util.List;

import nl.boksebeld.domein.plaats.BeplantingsPlan;
import nl.boksebeld.domein.plaats.PlantPlaats;

public interface PlannenService {
	BeplantingsPlan createBeplantingsPlan(String naam);

	BeplantingsPlan saveBeplantingsPlan(BeplantingsPlan beplantingsPlan);

	BeplantingsPlan getBeplantingsPlan(int id);

	List<BeplantingsPlan> getBeplantingsPlannen();

	BeplantingsPlan updateBeplantingsPlan(BeplantingsPlan beplantingsPlan);

	void deleteBeplantingsPlan(BeplantingsPlan beplantingsPlan);

	void deletePlantPlaats(PlantPlaats plantPlaats);

	PlantPlaats getPlantPlaats(int id);

}
