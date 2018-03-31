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
	private static String test = "XXXBEGIN_ID66BEGINGIMAGEFILEimage==EINDIMAGEFILE";

	private static String testje = "/9j/4AAQSkZJRgABAQEA2ADYAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/mESTsjxCleGXfqf/2Q==";
	@Inject
	private PlantenService plantenService;
	private static Base64 CODEC = new Base64();

	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Plant uploadFile(@FormDataParam("image") String image) throws IOException, ServletException {

		String imageString = getImageString(image);
		int id = getId(image);

		Plant orgineel = plantenService.getPlant(id);

		byte[] decodeBase64 = Base64.decodeBase64(imageString);
		orgineel.setImage(decodeBase64);
		plantenService.updatePlant(orgineel);

		Plant aangepast = plantenService.getPlant(id);
		aangepast.setBase64Image(CODEC.encodeBase64String(aangepast.getImage()));
		return aangepast;

	}

	private int getId(String invoer) {
		String substring = invoer.substring(invoer.indexOf(BEGIN_ID) + 8, invoer.indexOf(BEGINGIMAGEFILE));
		Integer.valueOf(substring);
		return Integer.valueOf(substring);
	}

	private String getImageString(String invoer) {
		String substring = invoer.substring(invoer.indexOf(BEGINGIMAGEFILE) + 15, invoer.indexOf(EINDIMAGEFILE));

		return substring;
	}

	public static void main(String[] args) {
		ImageResource imageResource = new ImageResource();
		byte[] decodeBase64 = CODEC.decodeBase64(testje);
		String conversie = CODEC.encodeBase64String(decodeBase64);

		System.out.println(conversie.equalsIgnoreCase(testje));
	}

}
