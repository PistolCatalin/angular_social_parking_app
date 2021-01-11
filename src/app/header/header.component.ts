import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ModalReportComponent} from '../shared/modal-report/modal-report.component'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService) {}
  ngOnInit(): void {

    const _this = this;
    this.authService.loggedIn.subscribe((data: boolean) => {_this.isLoggedIn = data;});
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();

  }
  goToUserProfile(){
    this.toastr.error("Not yet implemented:)")
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

}
