import { Injectable } from "@angular/core";
import { ResourceService } from "../resource.service";
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}


  saveBooking(body:any) {
    return this.dataAccess
      .POST(this.resource.booking.saveBooking, body)
      .pipe((response) => {
        return response;
      });
  }
}
