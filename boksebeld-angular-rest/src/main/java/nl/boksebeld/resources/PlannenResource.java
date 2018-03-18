package nl.boksebeld.resources;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.commons.codec.binary.Base64;

import nl.boksebeld.domein.plaats.BeplantingsPlan;
import nl.boksebeld.domein.plaats.PlantPlaats;
import nl.boksebeld.domein.plant.Plant;
import nl.boksebeld.domein.service.PlannenService;
import nl.boksebeld.domein.service.PlantenService;

@Path("/rest/plannen")
public class PlannenResource {
	@Inject
	private PlannenService plannenService;
	@Inject
	private PlantenService plantenService;

	private static Base64 CODEC = new Base64();

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public List<BeplantingsPlan> getAllePlanten() {

		List<BeplantingsPlan> plannenLijst = plannenService.getBeplantingsPlannen();

		for (BeplantingsPlan beplantingsPlan : plannenLijst) {
			// Leeg maken om niet te veel over de lijn te doen
			beplantingsPlan.getPlantPlaatsLijst().clear();
		}

		return plannenLijst;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public BeplantingsPlan getEenPlan(@PathParam("id") String id) {
		System.out.println(id + "gevonden id");

		BeplantingsPlan plan = plannenService.getBeplantingsPlan(Integer.valueOf(id));
		maakPlanGeschiktVoorJson(plan);
		return plan;
	}

	private void maakPlanGeschiktVoorJson(BeplantingsPlan plan) {
		Set<PlantPlaats> plantPlaatsLijst = plan.getPlantPlaatsLijst();
		for (PlantPlaats plantPlaats : plantPlaatsLijst) {
			plantPlaats.setBeplantingsPlan(null);
			Plant plant = plantPlaats.getPlant();
			if (plant != null) {

				Plant orgineel = plantenService.getPlant(plant.getId());

				orgineel.setBase64Image(CODEC.encodeBase64String(orgineel.getImage()));
				orgineel.setImage(null);
				plantPlaats.setPlant(orgineel);
			}
		}
	}

	@DELETE
	@Path("{id}")
	public void deleteplan(@PathParam("id") Integer id) throws IllegalStateException, IOException {
		BeplantingsPlan orgineel = plannenService.getBeplantingsPlan(id);
		plannenService.deleteBeplantingsPlan(orgineel);
	}

	@POST
	@Path("/copyplan")
	@Consumes(MediaType.APPLICATION_JSON)
	public void copyplant(BeplantingsPlan beplantingsPlan) throws IllegalStateException, IOException {
		BeplantingsPlan orginelePlan = plannenService.getBeplantingsPlan(beplantingsPlan.getId());
		BeplantingsPlan copyPlan = orginelePlan.createCopy();
		plannenService.saveBeplantingsPlan(copyPlan);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces({ MediaType.APPLICATION_JSON })
	public BeplantingsPlan savePlan(BeplantingsPlan beplantingsPlan) throws IllegalStateException, IOException {

		// dit moet volgens mij
		Set<PlantPlaats> plantPlaatsLijst = beplantingsPlan.getPlantPlaatsLijst();
		for (PlantPlaats plantPlaats : plantPlaatsLijst) {
			plantPlaats.setBeplantingsPlan(beplantingsPlan);
		}

		BeplantingsPlan saveBeplantingsPlan;
		if (beplantingsPlan.getId() == 0) {
			System.out.println("IN DE NIEUW PLAN TAK");
			saveBeplantingsPlan = plannenService.saveBeplantingsPlan(beplantingsPlan);
		} else {
			System.out.println("IN DE UPDATE PLAN TAK");

			saveBeplantingsPlan = plannenService.updateBeplantingsPlan(beplantingsPlan);
		}
		maakPlanGeschiktVoorJson(saveBeplantingsPlan);
		return saveBeplantingsPlan;
	}

	@DELETE
	@Path("deleteplaats/{id}")
	public void deleteplant(@PathParam("id") Integer id) throws IllegalStateException, IOException {
		System.out.println("komt binne met id" + id);
		PlantPlaats orgineel = plannenService.getPlantPlaats(id);
		System.out.println("orgineel is nu " + orgineel.getId());
		if (orgineel != null) {
			plannenService.deletePlantPlaats(orgineel);
		}

		System.out.println("na het deleten");
	}

}
