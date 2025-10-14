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
  menuOpen = false;
  constructor(
      private router: Router,
    ) {
    }

  ngOnInit(): void {
    this.userName = localStorage.getItem("CurrentUserName");
    this.profileImage = localStorage.getItem("profileImage");
    console.log("this.userName", this.userName);
  }

   navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
