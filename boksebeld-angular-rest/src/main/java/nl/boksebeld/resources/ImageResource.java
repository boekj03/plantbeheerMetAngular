package nl.boksebeld.resources;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import org.apache.commons.codec.binary.Base64;

import com.sun.jersey.multipart.FormDataParam;

import nl.boksebeld.domein.plant.Plant;
import nl.boksebeld.domein.service.PlantenService;

@Path("/rest/image")
public class ImageResource {

	private static final String EINDIMAGEFILE = "EINDIMAGEFILE";
	private static final String BEGINGIMAGEFILE = "BEGINGIMAGEFILE";
	private static final String BEGIN_ID = "BEGIN_ID";
	private static String test = "XXXBEGIN_ID66BEGINGIMAGEFILEimageEINDIMAGEFILE";
	@Inject
	private PlantenService plantenService;
	private static Base64 CODEC = new Base64();

	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Plant uploadFile(@FormDataParam("image") String image) throws IOException, ServletException {

		// ObjectMapper mapper = new ObjectMapper();
		// mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
		// false);
		// Plant plant = mapper.readValue(plantString, Plant.class);

		String imageString = getImageString(image);
		System.out.println("Image die aankomt op de service: " + imageString);
		System.out.println("Id die aankomt op de service: " + getId(image));

		Plant retVal = new Plant();
		retVal.setBase64Image(imageString);
		return retVal;

	}

	private String getId(String invoer) {
		String substring = invoer.substring(invoer.indexOf(BEGIN_ID) + 8, invoer.indexOf(BEGINGIMAGEFILE));
		return substring;
	}

	private String getImageString(String invoer) {
		String substring = invoer.substring(invoer.indexOf(BEGINGIMAGEFILE) + 15, invoer.indexOf(EINDIMAGEFILE));

		return substring;
	}

	// public static void main(String[] args) {
	// ImageResource imageResource = new ImageResource();
	// imageResource.getId(test);
	// imageResource.getImageString(test);
	//
	// }

}
