import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  userName: any;
  profileImage: any;
  constructor(
      private router: Router,
    ) {
    }

  ngOnInit(): void {
    this.userName = localStorage.getItem("CurrentUserName");
    this.profileImage = localStorage.getItem("profileImage");
    console.log("this.userName", this.userName);
  }
}
