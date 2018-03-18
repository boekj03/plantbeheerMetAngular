package nl.boksebeld.hibernate;

import java.util.List;

import javax.ejb.Stateless;

import nl.boksebeld.domein.plaats.BeplantingsPlan;
import nl.boksebeld.domein.plaats.PlantPlaats;

@Stateless
public class PlannenDAOImpl implements PlannenDAO {

	private static final Class PlantPlaats = null;

	public BeplantingsPlan createBeplantingsPlan(String naam) {
		final BeplantingsPlan beplantingsPlan = new BeplantingsPlan();
		beplantingsPlan.setNaam(naam);

		HibernateUtil.save(beplantingsPlan);
		return null;
	}

	public BeplantingsPlan saveBeplantingsPlan(BeplantingsPlan beplantingsPlan) {
		HibernateUtil.save(beplantingsPlan);
		return beplantingsPlan;
	}

	public BeplantingsPlan getBeplantingsPlan(int id) {
		return (BeplantingsPlan) HibernateUtil.get(BeplantingsPlan.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<BeplantingsPlan> getBeplantingsPlanen() {
		return (List<BeplantingsPlan>) HibernateUtil.getPlannenList(true);
	}

	public BeplantingsPlan updateBeplantingsPlan(BeplantingsPlan beplantingsPlan) {
		HibernateUtil.update(beplantingsPlan);
		return beplantingsPlan;
	}

	public void deleteBeplantingsPlan(BeplantingsPlan beplantingsPlan) {
		HibernateUtil.delete(beplantingsPlan);

	}

	public void deletePlantPlaats(PlantPlaats plantPlaats) {
		HibernateUtil.delete(plantPlaats);
	}

	@Override
	public PlantPlaats getPlantPlaats(int id) {
		return (PlantPlaats) HibernateUtil.get(PlantPlaats.class, id);
	}

}