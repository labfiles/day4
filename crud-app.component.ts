import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';


@Component({
  selector: 'app-root',
  template: `
      
    <label for="uname">User Name : </label><input [(ngModel)]="user.username" id="uname" type="text">
    <br>
    <label for="umail">User eMail : </label><input [(ngModel)]="user.usermail" id="umail" type="text">
    <br>
    <label for="ucity">User City : </label><input [(ngModel)]="user.usercity" id="ucity" type="text">
    <br>
    <button (click)="addUser()">Add User</button>

    <hr>

    <ul>
      <li *ngFor="let user of userarray"> {{  user.username +" "+user.usermail+" "+user.usercity +" "+user._id}}
        <button (click)="editUser(user)" >Edit</button>
        <button (click)="deleteUser(user)">Delete</button>
      </li>
    </ul>
    
    <div *ngIf="editready" class="box">
      <label for="uname">User Name : </label><input [(ngModel)]="euser.username" id="uname" type="text">
      <br>
      <label for="umail">User eMail : </label><input [(ngModel)]="euser.usermail" id="umail" type="text">
      <br>
      <label for="ucity">User City : </label><input [(ngModel)]="euser.usercity" id="ucity" type="text">
      <br>
      <button (click)="updateUser()">Update User</button>
    </div>
  `,
  styles:[`
  label{
        width : 100px;
        display : inline-block;
    }
    input+button{
      width : 100px;
      display : inline-block;
      margin-left : 100px
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'step10-crud';
  editready = false;
  userarray;
  user = {};
  euser = {};
  constructor(private hs:HeroService){}

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.hs.getUsers().subscribe( users => {
      this.userarray = users;
    })
  }
  addUser(){
    this.hs.postUser(this.user).subscribe( (res) => {
        console.log(res);
        this.user = {};
        this.getData();
    }, (error) => {
        console.log(error)
    });
  };

  editUser(ruser){
    this.editready = true;
    this.hs.getSelectedUser(ruser).subscribe( user => {
      this.euser = user;
    })
  }

  updateUser(){
    this.hs.modifyUser(this.euser).subscribe(res => {
      this.editready = false;
      this.euser = {};
      this.getData();
      
    })
  };
  
  deleteUser(user){
    this.hs.deleteUserService(user).subscribe( res => {
      this.getData();
    })
  }
}
