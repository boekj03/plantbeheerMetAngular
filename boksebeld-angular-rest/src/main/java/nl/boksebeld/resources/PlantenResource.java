package nl.boksebeld.resources;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.commons.codec.binary.Base64;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysql.jdbc.StringUtils;

import nl.boksebeld.domein.plant.Plant;
import nl.boksebeld.domein.service.PlantenService;

/**
 * 
 * @author hanst

 *
 */
@Path("/rest")
public class PlantenResource {

	@Inject
	private PlantenService plantenService;

	private static Base64 CODEC = new Base64();
	
	@GET
	@Path("/allePlanten")
	@Produces({ MediaType.APPLICATION_JSON })
	public PlantLijstContainer getAllePlanten() {
		System.out.println("In de plantenResource bij getAlleplanten");
		List<Plant> planten = plantenService.getPlanten();
		
		PlantLijstContainer plantLijstContainer = new PlantLijstContainer();
		
		if (planten != null) {
			
			for (Plant plant : planten) {
				plant.setBase64Image( CODEC.encodeBase64String(plant.getImage()));

			}
			System.out.println("In de plantenResource bij getAlleplanten gevonden zijn " + planten.size() + " planten");
		}
		plantLijstContainer.getPlantLijst().addAll(planten);
		return plantLijstContainer;
	}
	
	
	@GET
	@Path("/plant")
	@Produces({ MediaType.APPLICATION_JSON })
	public Plant getEenPlant(@Context HttpServletRequest request) {
		
		String id = request.getParameter("id");
		Plant plant = plantenService.getPlant(Integer.valueOf(id));
		plant.setBase64Image( CODEC.encodeBase64String(plant.getImage()));
		
		System.out.println("BIJ HET OPHALEN PLANT--------" + StringUtils.toString(plant.getImage()) + "XXXXX EINDE OPHALEN PLANT" );		
		return plant;
	}
	
	@POST
	@Path("/saveplant")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
    public  void uploadFile( @FormParam("plant") String plantString,  
    		@FormParam("oldimage") String oldimage, 
    		@FormParam("newimage") String newimage) throws IllegalStateException, IOException {
		
		
		
		ObjectMapper mapper = new ObjectMapper();
	
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Plant plant = mapper.readValue(plantString, Plant.class);
		if (!StringUtils.isNullOrEmpty(newimage)){
			plant.setImage(CODEC.decodeBase64(newimage.getBytes()));
		} else if (!StringUtils.isNullOrEmpty(oldimage)){
			plant.setImage(CODEC.decodeBase64(oldimage.getBytes()));
		}	
		System.out.println("BIJ HET UPDATEN  PLANT--------" +  StringUtils.toString(plant.getImage()) + "XXXXX EINDE UPDATEN PLANT" );	
		
		
		Plant updatePlant = plantenService.updatePlant(plant);
		System.out.println( "updatePlant Is" + 	updatePlant);  
  }



	

	

}
