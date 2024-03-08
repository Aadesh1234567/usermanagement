import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],

})
export class UserListComponent {
  users:any
  constructor(private userService: UserServiceService){

  }
  ngOnInit() {
    const usersString = localStorage.getItem('users');
    if (usersString) {
      this.users = JSON.parse(usersString);
      console.log(this.users, 'this.users');
    } else {
      // Handle the case where 'users' data is not found in localStorage
      console.log('No user data found in localStorage');
    }
  }
deleteUser(id: any) {
    this.users = this.users.filter((item: any) => item.id !== id);
    localStorage.setItem('users', JSON.stringify(this.users));
}
}
