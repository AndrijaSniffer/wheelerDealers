import { Component, OnInit } from '@angular/core';
import {User} from "../../../classes/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns = ["id", "username", "firstName", "lastName", "email", "isStaff", "isAdmin", "lastLogin", "dateJoined", "options"];
  usersDataSource: User[] = [];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this._userService.getAllUsers().subscribe((res: User[]) => {
      console.log(res);
      this.usersDataSource = res;
    })
  }

  openUserDialog(view: string, id_user: any) {

  }
}
