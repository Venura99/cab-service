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

  GetAllBooking() {
    return this.dataAccess
      .GET(this.resource.booking.getAllBooking)
      .pipe((response) => {
        return response;
      });
  }

  GetBookingById(id:any) {
    return this.dataAccess
      .GET(this.resource.booking.getBookingById + "/" + id)
      .pipe((response) => {
        return response;
      });
  }

  UpdateBooking(id:any,body:any) {
    return this.dataAccess
      .PATCH(this.resource.booking.updateBooking + "/" + id,body)
      .pipe((response) => {
        return response;
      });
  }

  DeleteBooking(id:any) {
    return this.dataAccess
      .DELETE(this.resource.booking.deleteBooking + "/" + id)
      .pipe((response) => {
        return response;
      });
  }

  StartTrip(id:any) {
    return this.dataAccess
      .PUT(this.resource.booking.startTrip + "/" + id, null)
      .pipe((response) => {
        return response;
      });
  }

  EndTrip(body:any) {
    return this.dataAccess
      .PUT(this.resource.booking.endTrip, body)
      .pipe((response) => {
        return response;
      });
  }
}
