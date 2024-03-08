import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent {
  userform!: FormGroup;
  pdata:any;
  userid:any;
  users: User[] = [];
  constructor(private formBuilder: FormBuilder, private userService: UserServiceService,private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.userid = this.route.snapshot.params['id'];
    this.userform = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      id:[]
    });
    if(this.userid != 0){
      const usersString = localStorage.getItem('users');
      if (usersString) {
        this.users = JSON.parse(usersString);
        console.log(this.users, 'this.users');
      } else {
        console.log('No user data found in localStorage');
      }
     this.patchvalue();
    }
  }
 
  submit(event: any): void {
    if (this.userform.invalid) {
     alert('please check all the filed')
      return;
    }
    let users: any[] = [];
    const storedUsers = localStorage.getItem('users');
    if (storedUsers !== null) {
        users = JSON.parse(storedUsers);
    }
    let nextId = 1;
    if (users.length > 0) {
        const maxId = Math.max(...users.map(user => user.id));
        nextId = maxId + 1;
    }
    this.userform.patchValue({ id: nextId });
    users.push(this.userform.value);
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/user/user-list']);
  }


patchvalue() {
  this.pdata = this.users.find(user => user.id == this.userid);
  console.log(this.pdata,'this.pdata')
  if (this.pdata) {
    this.userform.patchValue({
      firstName: this.pdata.firstName,
      lastName: this.pdata.lastName,
      email: this.pdata.email,
      mobileNumber: this.pdata.mobileNumber,
      address: this.pdata.address,
      id: this.pdata.id
    });
  } else {
    console.error('User not found');
  }
}
keyPressNumbers(event:any) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}
}
