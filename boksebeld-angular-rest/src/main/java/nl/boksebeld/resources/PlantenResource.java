package nl.boksebeld.resources;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.commons.codec.binary.Base64;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.boksebeld.domein.plant.Plant;
import nl.boksebeld.domein.service.PlantenService;

/**
 * 
 * @author hanst
 *
 * 
 */
@Path("/rest/planten")
public class PlantenResource {

	@Inject
	private PlantenService plantenService;

	private static Base64 CODEC = new Base64();

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Plant> getAllePlanten() {
		System.out.println("In de plantenResource bij getAlleplanten");
		List<Plant> planten = plantenService.getPlanten();

		if (planten != null) {

			for (Plant plant : planten) {
				if (plant.getImage() != null) {
					plant.setBase64Image(CODEC.encodeBase64String(plant.getImage()));
				}
			}
			System.out.println("In de plantenResource bij getAlleplanten gevonden zijn " + planten.size() + " planten");
		}

		return planten;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Plant getEenPlant(@PathParam("id") String id) {
		System.out.println(id + "gevonden id");

		Plant plant = plantenService.getPlant(Integer.valueOf(id));
		plant.setBase64Image(CODEC.encodeBase64String(plant.getImage()));
		return plant;
	}

	@PUT
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void update(@FormParam("plant") String plantString) throws IllegalStateException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Plant plant = mapper.readValue(plantString, Plant.class);

		Plant orgineel = plantenService.getPlant(plant.getId());
		plant.setImage(orgineel.getImage());
		plantenService.updatePlant(plant);

	}

	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces({ MediaType.APPLICATION_JSON })
	public Plant newPlant(@FormParam("plant") String plantString) throws IllegalStateException, IOException {

		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Plant plant = mapper.readValue(plantString, Plant.class);

		return plantenService.savePlant(plant);
	}

	@DELETE
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void deleteplant(@PathParam("id") String id) throws IllegalStateException, IOException {
		Plant orgineel = plantenService.getPlant((Integer.valueOf(id)));
		plantenService.deletePlant(orgineel);
	}

	@POST
	@Path("/copyplant")
	@Consumes(MediaType.APPLICATION_JSON)
	public void copyplant(Plant plant) throws IllegalStateException, IOException {
		Plant orginelePlant = plantenService.getPlant(plant.getId());
		Plant copyPlant = orginelePlant.createCopy();
		plantenService.savePlant(copyPlant);
	}

	// niet gebruiken ik wil die in de image resource
	@POST
	@Path("/jersey")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void uploadFile(@FormParam("file") File file, @FormParam("id") int id)
			throws IllegalStateException, IOException {

		System.out.println("HIJ IS ER ");

		FileInputStream fileInputStream = null;
		byte[] bytesArray = null;

		bytesArray = new byte[(int) file.length()];

		// read file into bytes[]
		fileInputStream = new FileInputStream(file);
		fileInputStream.read(bytesArray);

		Plant orginelePlant = plantenService.getPlant(id);
		orginelePlant.setImage(bytesArray);

		plantenService.updatePlant(orginelePlant);

	}

}
