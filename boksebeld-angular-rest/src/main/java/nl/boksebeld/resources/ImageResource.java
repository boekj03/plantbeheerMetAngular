package nl.boksebeld.resources;

import java.io.IOException;
import java.io.InputStream;

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

	private static String test = "LS0tLS0tV2ViS2l0Rm9ybUJvdW5kYXJ5U1ZJd2hWbmQxQkI4bE0wRQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJmaWxlIjsgZmlsZW5hbWU9InR0dC5wbmciDQpDb250ZW50LVR5cGU6IGltYWdlL3BuZw0KDQr/"
			+ "2P/gABBKRklGAAEBAQATABMAAP/hEN5FeGlmAABNTQAqAAAACAAGARoABQAAAAEAAABWARsABQAAAA";
	@Inject
	private PlantenService plantenService;
	private static Base64 CODEC = new Base64();

	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)

	public void uploadFile(@FormDataParam("file") InputStream file) throws IOException, ServletException {
		// @MultipartFormParam("file") FilePart filePar
		System.out.println("HIJ KOMT NU AAN IN DE DE IMAGE RESOURCE");
		//
		// System.out.print(file);
		// byte[] byteArray = IOUtils.toByteArray(file);
		//
		// System.out.println(CODEC.decodeBase64(byteArray));
		// System.out.println();
		// System.out.println();
		//
		Plant plant = plantenService.getPlant(5);

		// System.out.println();
		// System.out.println();
		// System.out.println();
		//
		System.out.println(plant.getImage().length); // 39391
		System.out.println("base64 ? " + CODEC.isBase64(plant.getImage()));
		System.out.println(CODEC.encodeBase64String(plant.getImage()));
	}

	// @POST
	// @Path("/jersey")
	// @Consumes(MediaType.MULTIPART_FORM_DATA)
	// public void formdataFile(@FormDataParam("file") InputStream
	// fileInputStream) throws IOException, ServletException {
	//
	// ImageInputStream imageInputStream =
	// ImageIO.createImageInputStream(fileInputStream);
	//
	// System.out.println(imageInputStream);
	//
	// BufferedImage image = ImageIO.read(imageInputStream);
	//
	// System.out.println(image); // deze is null dat willen we niet.
	// ByteArrayOutputStream out = new ByteArrayOutputStream();
	// ImageIO.write(image, "png", out);
	// byte[] byteArray = out.toByteArray();
	//
	// // byte[] byteArray = IOUtils.toByteArray(fileInputStream);
	// // System.out.println("base64 ? " + CODEC.isBase64(byteArray));
	// // String encodeToString = CODEC.encodeToString(byteArray);
	// // encodeToString = haalEersteStukEraf(encodeToString);
	// // // System.out.println("eerste stuk eraf " + encodeToString);
	// // byte[] decode = CODEC.decode(encodeToString);
	// // System.out.println("na het converten" + decode.length); // 39662
	// // System.out.println("base64 na conversie ? " +
	// // CODEC.isBase64(decode));
	// // File file = new File("test");
	// // FileUtils.copyInputStreamToFile(fileInputStream, file);
	// //
	// Plant plant = plantenService.getPlant(12);
	//
	// plant.setImage(byteArray);
	// plantenService.updatePlant(plant);
	// // System.out.println("Nu het updaten");
	// Plant gewijzigdeplant = plantenService.getPlant(12);
	// System.out.println(gewijzigdeplant.getImage().length); // 39662
	// }
	//

	@POST
	@Path("/jersey")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void formdataFile(@FormDataParam("file") InputStream fileInputStream, @FormDataParam("id") String id)
			throws IOException, ServletException {

		System.out.println("hij komt aan met file " + fileInputStream);

	}

	private String haalEersteStukEraf(String encodeToString) {
		int indexOf = encodeToString.indexOf("KDQr");
		if (indexOf > 0) {
			return encodeToString.substring(indexOf + 4);
		}
		return encodeToString;
	}

}
