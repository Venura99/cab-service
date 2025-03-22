import { Injectable } from "@angular/core";
import { ResourceService } from "../resource.service";
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}


  getAllVehicles(isWithInactive:boolean) {
    return this.dataAccess
      .GET(this.resource.vehicle.getAllVehicles + "?isWithInactive=" + isWithInactive)
      .pipe((response) => {
        return response;
      });
  }

  updateVehicleById(id:any,body:any) {
    return this.dataAccess
      .PATCH(this.resource.vehicle.updateVehicle + "/" + id, body)
      .pipe((response) => {
        return response;
      });
  }

  deleteVehicleById(id:any) {
    return this.dataAccess
      .DELETE(this.resource.vehicle.deleteVehicleById + "/" + id)
      .pipe((response) => {
        return response;
      });
  }
  

  
}
