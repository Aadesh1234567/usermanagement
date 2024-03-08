import { Component } from '@angular/core';
import { UserServiceService } from './user/user-service.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management';
  users: User[] = [];
  constructor(private userService: UserServiceService){

  }
  ngOnInit() {
  this.getUsers();
  }
  getUsers(): void {
    console.log(this.users,'users')
    this.userService.getUsers().subscribe(users => this.users = users);

  }
}
