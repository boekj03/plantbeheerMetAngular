package nl.boksebeld.hibernate;

import java.util.List;

import javax.ejb.LocalBean;

import nl.boksebeld.domein.plant.Plant;
import nl.boksebeld.domein.plant.PlantZoekItem;

@LocalBean
public interface PlantDAO {

	Plant savePlant(Plant plant);

	Plant getPlant(int id);

	List<Plant> getPlanten();

	Plant updatePlant(Plant plant);

	void deletePlant(Plant plant);

	List<Plant> getPlantLijst(PlantZoekItem plantZoekItem);
}
