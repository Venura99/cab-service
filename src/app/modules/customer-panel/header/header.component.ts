import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  userName: any;
  ngOnInit(): void {
    this.userName = localStorage.getItem("CurrentUserName");
    console.log("this.userName", this.userName);
  }
}
