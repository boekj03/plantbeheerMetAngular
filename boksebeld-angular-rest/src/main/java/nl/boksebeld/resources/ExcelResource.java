package nl.boksebeld.resources;

import java.io.File;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import nl.boksebeld.application.BeplantingsPlanToExcel;
import nl.boksebeld.domein.plaats.BeplantingsPlan;
import nl.boksebeld.domein.service.PlannenService;

@Path("/rest/excel")
public class ExcelResource {

	@Inject
	private PlannenService plannenService;

	@Inject
	private BeplantingsPlanToExcel beplantingsPlanToExcel;

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getFile(@PathParam("id") Integer id) {

		BeplantingsPlan beplantingsPlan = plannenService.getBeplantingsPlan(id);
		File plantToExcel = beplantingsPlanToExcel.plantToExcel(beplantingsPlan);

		ResponseBuilder rb = Response.ok(plantToExcel);
		rb.header("content-disposition", "attachment; filename=rest-test.xlsx");
		return rb.build();

	}
}
